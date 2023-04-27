import CommentUI from "../components/CommentUI.svelte";
import { resetStore } from "src/stores/resetStore";
import { storage } from "../storage";

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then(console.log);

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function getElementsByXpath(xpath) {
  const result = [];
  const nodes = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );
  let node = nodes.iterateNext();
  while (node) {
    result.push(node);
    node = nodes.iterateNext();
  }
  return result;
}

// Select the node that will be observed for mutations

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

let attachedComments = [];
let testText: string | null = null; //this is the first comment, change it to something safer or find another way to detect when switching to new youtube videoc
function attachCommentUI() {
  const comments = getElementsByXpath('//*[@id="content-text"]/../..');

  if (!comments[0]) return;
  //set testText if it is null
  if (testText === null) {
    testText = comments[0]?.querySelector("#content-text")?.textContent || null;
  } else if (
    testText !== null &&
    testText !== comments[0]?.querySelector("#content-text")?.textContent
  ) {
    //reset if the first comments text has changed
    reset();
  }

  if (comments.length === attachedComments.length) return;

  comments.forEach((comment) => {
    if (attachedComments.includes(comment)) return;
    const textWrapper: HTMLElement = comment.querySelector("#content-text");
    textWrapper.style.transition = "150ms ease-in-out";
    new CommentUI({
      target: comment,
      props: {
        textWrapper: textWrapper,
      },
    });
    attachedComments.push(comment);
  });
}

// Callback function to execute when mutations are observed
const mutationCallback = (mutationList, observer) => {
  attachCommentUI();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback);

//check if comment section exists
const commentSectionChecker = setInterval(() => {
  const targetNode = getElementByXpath('//*[@id="comments"]');
  if (targetNode) {
    observer.observe(targetNode, config);
    clearInterval(commentSectionChecker);
  }
}, 100);
// Start observing the target node for configured mutations

function reset() {
  setTimeout(() => {
    testText = null;
    observer.disconnect();
    attachedComments = [];
    resetStore.set(true);

    setTimeout(() => {
      resetStore.set(false);
      const targetNode = getElementByXpath('//*[@id="comments"]');
      observer.observe(targetNode, config);
      clearInterval(commentSectionChecker);
    }, 0);
  }, 0); //timeouts as a hack to make sure the reset is done after the commentUI is removed
}

export const getOpenAiClassification = (comment) =>
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
