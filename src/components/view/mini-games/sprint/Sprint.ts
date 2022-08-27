export default class SprintGame {
  createElement() {
    return `<section class="sprint">
    <div class="games__btn-wpapper">
        <button class="games__sound-btn">Звук</button>
        <button class="games__screen-btn">На весь экран</button>
        <button class="games__close-btn">&#9587</button>
    </div>
    <div class = "sprint__body">
    <div class = "sprint__header">
        <div class = "sprint__score">0</div>
        <div class = "sprint__timer">60</div>
    </div>

    <div class = "sprint__word"></div>
    <div class = "sprint__translate"></div>
    <div class = "sprint__answer">
        <button class = "sprint__answer-btn sprint__answer-btn-false">&#10008</button>
        <button class = "sprint__answer-btn sprint__answer-btn-true">&#10004</button>
    </div>
    <div class = "sprint__back">
    <button class = "sprint__back-to-new-game">Новая игра</button>
    <button class = "sprint__back-to-list-games">К списку игр</button>
    </div>
  </div>
  <div class="games__finish">

  </div>
  </section>`;
  }
}
