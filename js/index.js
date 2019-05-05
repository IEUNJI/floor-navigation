class Floor {
  constructor({ con, nav }) {
    this.conList = Floor.$All(`${con} > .floor`);
    this.header = this.conList[0];
    this.nav = Floor.$(nav);
    this.navList = Floor.$All(`${nav} > li`);
    this.prevIdx = 0;
    this.curIdx = 0;
    this.init();
  }
  static $(selector) {
    return document.querySelector(selector);
  }
  static $All(selector) {
    return document.querySelectorAll(selector);
  }
  clickEvent() {
    this.navList.forEach((item, index) => {
      item.onclick = () => {
        this.conList[index].scrollIntoView({ behavior: 'smooth' });
      };
    });
  }
  observeHeader() {
    this.io1 = new IntersectionObserver(entries => {
      this.nav.style.display = entries[0].isIntersecting ? 'none' : 'block';
    });
    this.io1.observe(this.header);
  }
  observeCurrent() {
    this.io2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.prevNav = this.navList[this.prevIdx];
          this.prevNav.classList.remove('current');
          this.prevNav.innerHTML = this.prevNav.dataset.init;
          this.curIdx = [].indexOf.call(this.conList, entry.target);
          this.prevIdx = this.curIdx;
          this.curNav = this.navList[this.curIdx];
          this.curNav.classList.add('current');
          this.curNav.innerHTML = this.curNav.dataset.cur;
        }
      });
    }, { threshold: [0.3, 0.7] });
    this.conList.forEach(item => this.io2.observe(item));
  }
  init() {
    this.clickEvent();
    this.observeHeader();
    this.observeCurrent();
  }
}
new Floor({ con: '#con', nav: '#nav' });
