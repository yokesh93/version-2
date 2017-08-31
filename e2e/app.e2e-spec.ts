import { ConFusonPage } from './app.po';

describe('con-fuson App', () => {
  let page: ConFusonPage;

  beforeEach(() => {
    page = new ConFusonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
