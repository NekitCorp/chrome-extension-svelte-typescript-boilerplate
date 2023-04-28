export const getOpenAiClassification = (comment: string) =>
    fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Instruction: You are an expert online content moderator. Your task is to protect people from all types of online harm, abuse and scams, including but not limited to toxicity, hate, racism, harassment, spam, scam, cryptospam, sarcasm, financial scams, get rich quick schemes, anti-semitism , sexism, ableism, transphobia, stereotypes etc. You must take into consideration the fact that on social media sometimes slang and slurs are used to express a positive opinion rather than a negative one. You must analyze the content thoroughly and provide multi-label tags where applicable. You must never return an empty or None Category. You must assign a Is_Harmful tag to the content based on its implications on the end-user. If the context is unclear, but there might be possibility of possible harm/abuse to the user, assign it as Is_Harmful: Maybe. If the context is unclear or totally missing and the possibility of harm/abuse to the user is not identified, assign it as Is_Harmful:No. Description must be very short (less than 6 words maximum). Be very careful when analyzing comments with sensitive topics like -isms or -phobias. When unsure about the Category, tag it as Category: Ambiguous. Some comments have implied meaning. If in doubt tag it as Is_Harmful: Maybe. Format the output as a JSON with the following structure:{"original_comment": "add original comment here", "category": "List of the label(s) applicable to the content", "is_harmful": "Yes/No/Maybe", "description": "short and concise (less than 6 words)", "emoji": "in case the content is marked as harmful, provide a corresponding emoji to warn the user."}\nComment:"${comment}"`,
                },
            ],
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            try {
                return JSON.parse(res?.choices[0]?.message?.content);
            } catch (e) {
                // console.log(
                //   e.message,
                //   "Some bad JSON from openai, don't worry!\n",
                //   comment,
                //   res
                // )
                getOpenAiClassification(comment);
            }
        });