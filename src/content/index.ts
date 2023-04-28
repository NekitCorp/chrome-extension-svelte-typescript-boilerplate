import { resetStore } from "src/stores/resetStore";

import { getElementByXpath, getElementsByXpath } from "../utils/helpers";
import CommentUI from "../components/CommentUI/CommentUI.svelte";
import Overlay from "../components/Overlay/Overlay.svelte";

// Some global styles on the page
import "./styles.css";

//set overlay

new Overlay({ target: document.body });

const { host } = document.location;

let xPathSelector,
  xPathTargetSelector,
  querySelector = "";
switch (host) {
  case "www.youtube.com":
    xPathSelector = '//*[@id="content-text"]/../..';
    xPathTargetSelector = '//*[@id="comments"]';
    querySelector = "#content-text";
    break;
  case "twitter.com":
    xPathSelector = "//*[@data-testid='tweetText']/..";
    xPathTargetSelector = "//*[@data-testid='tweetText']";
    querySelector = "[data-testid='tweetText']";
    break;
  default:
    break;
}

// Select the node that will be observed for mutations

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

let attachedComments = [];
function attachCommentUI() {
  const comments = getElementsByXpath(xPathSelector);
  if (!comments[0] || comments.length === attachedComments.length) return;

  comments.forEach((comment) => {
    if (attachedComments.includes(comment)) return;

    const textWrapper: HTMLElement =
      xPathSelector !== xPathTargetSelector
        ? comment.querySelector(querySelector)
        : comment;
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

let commentSectionChecker;

const runObserver = () => {
  if (host === "www.youtube.com") {
    // YouTube causes the document to mutate periodically, even when simply watching a video. Therefore, for YouTube, we need to check exactly the necessary element, and not the entire document for changes.
    commentSectionChecker = setInterval(() => {
      const targetNode = getElementByXpath(xPathTargetSelector);
      if (targetNode) {
        observer.observe(targetNode, config);
        clearInterval(commentSectionChecker);
      }
    }, 100);
  } else {
    observer.observe(document, config); // Document change check. On new sites, we need to check that the document refresh is called when the user is active or when new elements appear.
  }
};

function reset() {
  setTimeout(() => {
    observer.disconnect();
    attachedComments = [];
    resetStore.set(true);

    setTimeout(() => {
      resetStore.set(false);
      runObserver();
    }, 0);
  }, 0); //timeouts as a hack to make sure the reset is done after the commentUI is removed
}

const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        reset();
      }
    });
  });
  observer.observe(body, { childList: true, subtree: true });
};
runObserver(); // Start observing the target node for configured mutations
if (host === "www.youtube.com") {
  observeUrlChange(); // Start observing the href mutations
}
