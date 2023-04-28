export const getOpenAiClassification = (comment: string) =>
  fetch(
    "https://us-central1-truefilter-10000.cloudfunctions.net/openaiResponse",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ comments: comment }),
    }
  ).then((res) => res.json());
