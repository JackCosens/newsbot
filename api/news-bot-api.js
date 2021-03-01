var Twitter = require('twitter')
const urlMetadata = require('url-metadata')
var mysql = require('mysql')

var config = require('./config')

var client = new Twitter(config.twitter)

var articles = [];
var loggedTweets = [];

// Passthrough mysql connection to config structure
config.con = mysql.createConnection(config.mysql);
config.con.connect();

start()
function start() {
  // Fetch collected data and store in memory
  config.con.query(`SELECT * FROM articles`, (err, rows) => {
    if (err) throw err;
    rows.forEach(function(row) {
      articles.unshift({
        id: row.id,
        text: row.text,
        url: row.url,
        img: row.img,
        src: row.src,
        date: row.date
      });

      loggedTweets.push(row.id);
    });
  });

  checkNews()
  setInterval(checkNews, 30000)

  setTimeout(s => {
    articles = articles.sort((a, b) => b.date - a.date)
    console.log(articles[0])
  }, 10000)
}

async function fetchTweets(account) {
  client.get('statuses/user_timeline', { screen_name: account, count: 25 }, function(
    error,
    tweets,
    response
  ) {
    if (error) console.error(error)
    tweets.forEach(tweet => {
      // Handling for avoiding retweets, only logging original news source
      let tweet_txt = tweet.text
      if (tweet_txt.charAt(0) != 'R' && tweet_txt.charAt(1) != 'T') {
        if (!loggedTweets.includes(tweet.id_str)) {
          // Filtering to remove the tweet URL and any linebreaks/formatting made in tweets
          let clean_tweet_txt = tweet_txt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
          clean_tweet_txt = clean_tweet_txt.replace(/(\r\n|\n|\r)/gm, " ");

          loggedTweets.push(tweet.id_str);
          
          // Fetching thumbnail image from extended url
          tweet.entities.urls.forEach(url => {
            if (url.expanded_url) {
              urlMetadata(url.expanded_url).then(
                function (metadata) { // success handler
                  if (metadata.image) {
                    insertNewArticle({
                      id: tweet.id_str,
                      text: clean_tweet_txt,
                      url: url.expanded_url,
                      img: metadata.image,
                      src: account,
                      date: tweet.created_at
                    })
                  }
                },
                function (error) { // failure handler
                  console.log(error)
                })
            }
          })
        }
      }
    });
  })
}

async function insertNewArticle(data) {
  if (data) {
    console.log('[ALERT] Found new article from source: '+data.src+" || Title: "+data.text)
    // Insert into database for logging here 
    let time_now = new Date()
    var sql = config.con.format('INSERT INTO `articles` (`id`, `text`, `url`, `img`, `src`, `date`) VALUES (?, ?, ?, ?, ?, ?)', [data.id, data.text, data.url, data.img, data.src, time_now]);
    config.con.query(sql);

    // Add to memory array for fast release in api
    articles.unshift(data)
    articles = articles.sort((a, b) => b.date - a.date)

    // Trigger webhook to official discord bot for posting
  }
}

async function checkNews() {
  let watchedTwitter = config.accounts
  watchedTwitter.forEach(acc => {
    fetchTweets(acc)
  })
}