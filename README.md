# newsbot
 Simple discord news bot.
 Discord bot designed to post news updates into a selected channel on a discord. The bot is public and you can invite it to your discord [here](https://discord.com/oauth2/authorize?client_id=815994555543322664&permissions=60480&scope=bot)

# twitter why?
I decided to use twitter as for my use-case it was easiest. The script simply loops through a configured set of twitter accounts (popular UK news sites) and stores a mysql memory of any posts. On the next iteration of the check it references back to detect any changes and triggers a webhook (to the discord bot) accordingly.

The "api" part of the project was quickly done and I intend to redo that in the future when I implement a public json page for other developers to reference/pull data from.

# discord bot
The discord bot is written in [discord.js](https://discord.js.org), you can view documentation on their site. You will quickly notice, I enjoy using GIF's in my messages :)

# to-do
- [x] public discord bot with basic setup command
- [ ] add filters per guild, allow users to select what newsfeed they sign up for
- [ ] public news-api (REST)
