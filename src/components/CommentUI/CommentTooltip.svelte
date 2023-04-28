<script lang="ts">
  let reason = "Harmful";
  let explanation = "This comment has been flagged as harmful by our AI";
</script>

<div class="comment-tooltip">
  <b>{reason}</b>
  &nbsp;
  <span>{explanation}</span>
</div>

<style>
  .comment-tooltip {
    position: absolute;
    min-width: 260px;
    bottom: 20px;
    right: 8px;
    background: linear-gradient(
      109.93deg,
      rgba(60, 215, 187, 0.32) -2.26%,
      rgba(116, 8, 223, 0.3) 114.4%
    );
    backdrop-filter: blur(10px);
    padding: 12px;
    border-radius: 10px 10px 0 10px;
  }
</style>
