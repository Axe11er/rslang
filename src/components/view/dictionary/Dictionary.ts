import store from '../../../store/store';
import preloaderGIF from '../../../assets/preloader.gif';

export default class Dictionary {
  dictionaryState = store.getState().dictionary;

  userState = store.getState().user;

  words =
    this.dictionaryState.activeTab === 'all'
      ? this.dictionaryState.words
      : this.userState.statistic.optional.words.complexWords;

  private renderWords() {
    return this.words
      .map((word) => {
        return `<div class="textbook__word
        ${word.id === this.dictionaryState.selectedWord ? 'textbook__word--active' : ''}
        ${
          this.userState.statistic.optional.words.complexWords.some((el) => el.id === word.id)
            ? 'textbook__word--complex'
            : ''
        }
        ${
          this.userState.statistic.optional.words.learnedWords.some((el) => el.id === word.id)
            ? 'textbook__word--learned'
            : ''
        }
        ${
          this.userState.statistic.optional.words.complexWords.some((el) => el.id === word.id) &&
          this.userState.statistic.optional.words.learnedWords.some((el) => el.id === word.id)
            ? 'textbook__word--complex-and-learned'
            : ''
        }
        textbook__word--group-${word.group}"
        id=${word.id}>
            <span class="word__text">${word.word}</span>
            <span class="word__text">${word.wordTranslate}</span>
          </div>`;
      })
      .join('');
  }

  private renderCard() {
    const selected = this.words.find((word) => word.id === this.dictionaryState.selectedWord);
    if (!selected) return '';
    return `<div class="textbook__card card textbook__card--group-${this.dictionaryState.group}">
    <img class="card__img" src='https://rslang-172.herokuapp.com/${selected.image}'/>
    <div class="card__content">
      <div class="card__main">
        <h2 class="card__word">${selected.word}</h2>
        <h3 class="card__translate">${selected.wordTranslate}</h3>
        <span class="card__transcription">${selected.transcription}</span>
        <div class="card__buttons">
         <button class="card__play btn" type="button" id="play-audio-btn"
         ${this.dictionaryState.isPlaying ? 'disabled' : ''}>??????????????????????????</button>
         <div class="card__user-buttons ${this.userState.isLoggedOn ? '' : 'hidden'}">
         <button class="card__btn-set-complex btn
         ${this.userState.statistic.optional.words.complexWords.some((word) => word.id === selected.id) ? 'hidden' : ''}
         " id="add-complex">???????????????? ?? ??????????????</button>
         <button class="card__btn-set-complex btn
         ${
           !this.userState.statistic.optional.words.complexWords.some((word) => word.id === selected.id) ? 'hidden' : ''
         }
         " id="delete-complex">?????????????? ???? ??????????????</button>
         <button class="card__btn-set-learned btn
         ${this.userState.statistic.optional.words.learnedWords.some((word) => word.id === selected.id) ? 'hidden' : ''}
         " id="add-learned">??????????????</button>
         <button class="card__btn-set-learned btn
         ${
           !this.userState.statistic.optional.words.learnedWords.some((word) => word.id === selected.id) ? 'hidden' : ''
         }

         " id="delete-learned">?????????????? ???? ??????????????????</button>
         </div>
        </div>
      </div>
      <div class="card-description">
        <h4 class="card__mean card-subtitle">????????????????</h3>
          <p>${selected.textMeaning}</p>
          <p>${selected.textMeaningTranslate}</p>
          <h4 class="card__example card-subtitle">????????????</h3>
            <p>${selected.textExample}</p>
            <p>${selected.textExampleTranslate}</p>
      </div>
    </div>
  </div>`;
  }

  createElement() {
    const { isLoading } = store.getState().dictionary;
    return isLoading
      ? `<div class="audiochallenge__preloader preloader visible">
    <img class="preloader__img" src="${preloaderGIF}" alt="preloader">
  </div>`
      : `<section class="textbook">
    
    <div class="textbook__container container">
      <div class="textbook__workspace">
        <h2 class="textbook__title title">???????????????? ??????????????</h2>
        <ul class="textbook__level-list">
          <li class="textbook__level-item textbook__level-item--a1" id="group-0">
            <span class="textbook__difficulty-btn">
              Elementary A1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--a2" id="group-1">
            <span class="textbook__difficulty-btn">
              Pre-Intermediate A2
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--b1" id="group-2">
            <span class="textbook__difficulty-btn">
              Intermediate B1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--b2" id="group-3">
            <span class="textbook__difficulty-btn">
              Upper-Intermediate B2
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--c1" id="group-4">
            <span class="textbook__difficulty-btn">
              Advanced C1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--c2" id="group-5">
            <span class="textbook__difficulty-btn">
              Proficiency C2
            </span>
          </li>
        </ul>
        <div class="textbook__buttons">
        <div class="textbook__user-buttons ${this.userState.isLoggedOn ? '' : 'hidden'}">
        <button class="textbook__set-btn btn" type="button" id="all-words-btn"
        ${this.dictionaryState.activeTab === 'all' ? 'disabled' : ''}>?????? ??????????</button>
        <button class="textbook__set-btn btn" type="button" id="complex-words-btn"
        ${this.dictionaryState.activeTab === 'complex' ? 'disabled' : ''}>?????????????? ??????????</button>
        </div>
        <div class="textbook__games-buttons">
        <button class="textbook__set-btn btn" id="audiochallenge-btn" type="button">????????????????????</button>
        <button class="textbook__set-btn btn" id="dictionary-sprint-link" type="button">????????????</button>
        </div>
        </div>
        <div class="textbook__words">
        ${this.renderWords()}
        </div>
      <nav class="textbook__pagination">
        <input type="button" class="pagination__btn textbook__btn-prev" id='prev-button'
        ${this.dictionaryState.page === 0 ? 'disabled' : ''}/> <label class="textbook__btn-prev-label
        ${this.dictionaryState.page === 0 ? 'textbook__btn-label--disabled' : ''}"
        for="prev-button"> << </label>
        <span class="textbook__page-pointer">${this.dictionaryState.page + 1}</span>
        <input type="button" class="pagination__btn textbook__btn-next" id='next-button'
        ${this.dictionaryState.page >= 29 ? 'disabled' : ''}/>
        <label class="textbook__btn-next-label textbook__btn-label
        ${this.dictionaryState.page >= 29 ? 'textbook__btn-label--disabled' : ''}"
        for="next-button"> >> </label>
      </nav>
      </div>
      <div class="textbook__card-container">
      ${this.renderCard()}
      </div>
    </div>
  </section>`;
  }
}
