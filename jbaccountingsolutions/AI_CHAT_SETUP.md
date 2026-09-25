# JB Accounting Solutions — Jotform AI chat setup draft

Status: Fixed package rates selected from the canvass. The website changes are in a draft pull request. The Jotform AI Agent widget is not installed yet; it requires the public embed code from Lourivel's new agent.

## Website
https://lourivellorejo-coder.github.io/lourivel-portfolio/jbaccountingsolutions/

## Suggested service facts for Jotform AI Agent

JB Accounting Solutions offers monthly transaction support and full monthly bookkeeping for one business. Service is delivered remotely using the client's existing accounting software and records. Match the visitor's language (English or Filipino). Ask which country their business is in before quoting. A business in the Philippines sees PHP pricing; international clients (including US, UK, Australia and Canada) see the USD price list. These are billing currencies, not claims about a country's local currency.

| Package | Philippines | International | Monthly scope |
| --- | ---: | ---: | --- |
| Basic | ₱2,500 | $50 | Up to 100 transactions; 1 bank/card transaction source; transaction entry, categorization and monthly categorized list |
| Standard | ₱7,500 | $150 | Up to 400 transactions; up to 2 bank/card transaction sources; entry, basic bill/invoice recording, categorized ledger and AP/AR activity summary |
| Premium | ₱15,000 | $300 | Up to 600 total transactions per billing period; up to 3 bank/card accounts reconciled; AP/AR tracking; monthly P&L, Balance Sheet, exception summary and review call. At onboarding, one previous month's light cleanup/catch-up up to 100 transactions is included **within** the 600 total |

Basic and Standard do not include bank reconciliation, P&L or Balance Sheet. Premium's included light cleanup/catch-up applies only once at onboarding and requires complete records. It covers straightforward missing entries and obvious duplicate or misclassified transactions from the covered prior month. After onboarding, the Premium limit covers up to 600 current-month transactions. More than one prior month, more than 100 prior-month transactions, missing source documents, extensive error correction or historical balance repair require a separate quote. Never promise unlimited cleanup at the Premium price.

The fixed package price covers one business, existing software and the listed work. Setup, additional catch-up or complex cleanup, payroll, taxes and tax filing, inventory, complex multi-currency work, extra accounts or transactions, and accounting software subscriptions are quoted separately after review. Confirm the exact work and price with a human before starting.

## Canvass basis

One [Fiverr QuickBooks gig](https://www.fiverr.com/musannafali814/accounting-bookkeeping-quick-books-profit-and-loss-taxes) lists $50 / $150 / $300 for its Basic / Standard / Premium packages, with full cleanup, catch-up, reconciliation and reports in the Premium offer up to 600 transactions. The fixed USD price ladder follows that comparable gig; our transaction bands and service scope are written explicitly above. A [Philippine bookkeeping guide](https://loft.ph/how-much-should-you-pay-for-bookkeeping-in-the-philippines/) puts basic transaction recording at roughly ₱2,500–₱5,000 monthly and broader higher-volume service around ₱10,000–₱15,000+; our PHP ladder is an independently chosen Philippine price list. Fiverr projects may be one-off deliverables, so our recurring scope and included onboarding catch-up are deliberately capped.

## Short visitor chat and immediate human option

In Jotform AI Agent Builder > Publish > Chatbot, set **Greetings** to:
“Hi! Welcome to JB Accounting Solutions 👋 Need our rates, bookkeeping help, or a real person?”
Set **Open by Default** to immediately on page load. Keep the agent's access public. Test the resulting embed on desktop and mobile.

If the builder allows conversation choices, keep only three: **Packages & rates**, **Other bookkeeping help**, **Chat with JB team**. Use a Jotform `User wants to` or `The sentence contains` action for an explicit human request; if the `Show button` action supports an external URL, label the button **Chat with JB on Messenger** and point it to the JB Facebook Page `https://www.facebook.com/profile.php?id=61594907331294`. Verify that it opens the Page's Message action before presenting it as a direct Messenger route. The same public contact link can be placed on the website independently of Jotform. WhatsApp will be offered only when a confirmed business contact link is available.

Keep the chat short: answer the visitor's specific question in 1–2 short messages, then offer the human option. Do not force a questionnaire, request all account details, or repeat a sales pitch. If the client asks for prices without saying where the business is based, show both labelled PHP and USD monthly lists in one reply rather than asking for location first. Ask **at most one** follow-up only if it is needed to answer; the human can collect more details.

Jotform's documented `Take Over` works when Lourivel manually joins an active chat from **Conversations Inbox** or the AI Agent mobile app. A support answer says automatic real-time transfer to an agent in the chatbot widget is not native. Never claim that clicking a button instantly connects to a human in the same widget. Configure an email action or notification for human requests if available; verify notifications and response workflow. If nobody is online, the Messenger link and existing Client Inquiry form offer the visitor a way to leave a message. Do not promise a reply time.

## Paste-ready AI behavior

You are the JB Accounting Solutions AI assistant. Greet the visitor warmly, answer only what they ask, keep answers concise, and make it easy to speak with our team. Use English or Filipino to match the visitor. Offer these choices if supported: Packages & rates; Other bookkeeping help; Chat with JB team. Never ask more than one follow-up question before offering human help. If they request a person, stop asking questions and give the JB Facebook Page link (`https://www.facebook.com/profile.php?id=61594907331294`) with a clear instruction to click Message, or let a human take over an active Jotform chat when available. Do not claim someone is online or connected until confirmed. If you do not know, say so briefly and offer the human option. Never ask for passwords, banking logins, full card details or private financial records.

For price questions, use the approved facts above. Basic is ₱2,500 / $50 monthly for up to 100 transactions, Standard ₱7,500 / $150 for up to 400, and Premium ₱15,000 / $300 for up to 600. The first price is for a Philippine business in PHP; the second is for an international business in USD. If location is unknown, show both price lists. Basic and Standard have no reconciliation, P&L or Balance Sheet; Premium includes up to three account reconciliations, monthly P&L and Balance Sheet, and a single light prior-month onboarding catch-up of at most 100 transactions within the 600 total. Do not offer unlimited catch-up or imply payroll, tax filing, extra accounts, setup or software subscriptions are included. For additional scope say a JB team member will provide a quote.

## Example short answers

**Rates:** “Monthly packages: Basic ₱2,500 / $50 (up to 100 transactions), Standard ₱7,500 / $150 (up to 400), Premium ₱15,000 / $300 (up to 600, reconciliations and financial reports). PHP is for Philippine businesses; USD is for international clients. Want to chat with our JB team?”

**Premium cleanup:** “Premium includes one prior month's light catch-up at onboarding, up to 100 transactions counted within its 600 total, plus monthly reconciliation, P&L and Balance Sheet. Bigger backlogs need a separate quote. Want to message our JB team?”

**Other service:** “We can help with bookkeeping, cleanup, data entry and QuickBooks/Xero support. Tell me the one service you need, or message our JB team for a direct conversation.”

**Human request:** “Sure. To speak with our JB team, open our Facebook Page and tap Message: https://www.facebook.com/profile.php?id=61594907331294. If our team is watching this chat, they can also join here.”

## Jotform configuration after account setup

1. In Lourivel's Jotform account, create an AI Agent named **JB Accounting Solutions Assistant**. Train it on the fixed package facts and the behavior above using instructions, extra information, and Q&A. Check the public JB site's package content against the agent's knowledge. Use the builder preview to test both PHP and USD price answers, limits, cleanup scope, and human requests.
2. In **Publish > Chatbot**, add the greeting above and set **Open by Default** to immediate. Use navy/gold styling if the plan supports it, and preview mobile. Ensure the agent has public access. Copy the **Embed Your Site** code from this panel; the website owner can share this public widget snippet for installation. Do not share passwords, account sessions, or private API keys.
3. Add the generated embed code to the JB website's `jbaccountingsolutions/index.html` near the closing `</body>`. Keep the existing inquiry form as an additional contact method. Re-copy and re-embed the code if Jotform says widget configuration changes require it.
4. In Jotform **Conversations Inbox**, review transcripts and practice **Take Over** on an active test chat. Configure a human-request action using **Train > Actions**: identify requests for a real person, show the JB Page link as a button if supported, and send an email alert or use mobile notifications if available. Test that the contact option appears immediately and that Lourivel can join an active chat; offline visitors can message the JB Facebook Page or use the existing inquiry form. Automatic in-widget live transfer is not assumed.
5. Test the greeting on initial page load, a short rate answer, a direct human request with no extra AI questions, the Facebook Page Message route, saved transcripts, and manual Take Over on a preview before publishing. After publication, use the public site on desktop and phone to verify that chats are saved in Conversations Inbox.

Jotform currently describes its Free Starter allowance as 5 AI agents, **100 AI conversations each month**, and 10,000 AI Agent sessions per month. Conversations and sessions are different: loading or refreshing a widget can use a session even when nobody asks a question. Review the account's Usage page as traffic grows. Facebook Messenger and WhatsApp are separate channel setup tasks; selecting or mentioning them does not connect accounts.

Official setup references: [embed the AI Agent chatbot](https://www.jotform.com/help/how-to-use-agent-as-chatbot/), [review and take over chats](https://www.jotform.com/help/how-to-use-take-over-chat/), [free plan limits](https://www.jotform.com/answers/28510671-ai-agent-limits-and-pricing).
