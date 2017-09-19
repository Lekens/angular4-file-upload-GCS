import { UploadFileTestPage } from './app.po';

describe('upload-file-test App', () => {
  let page: UploadFileTestPage;

  beforeEach(() => {
    page = new UploadFileTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
