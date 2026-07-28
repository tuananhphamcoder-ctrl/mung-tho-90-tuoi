const SHEET_NAME = 'RSVP';

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Thời gian',
      'Họ và tên',
      'Số điện thoại',
      'Số khách',
      'Tình trạng tham dự',
      'Lời chúc',
      'Thời gian từ website'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const sheet = getSheet_();
  const p = e.parameter || {};
  const guests = Math.max(0, Number(p.guests || 0));
  sheet.appendRow([
    new Date(),
    p.name || '',
    p.phone || '',
    guests,
    p.attendance || '',
    p.message || '',
    p.createdAt || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  let count = 0;

  for (let i = 1; i < values.length; i += 1) {
    const guests = Number(values[i][3] || 0);
    const attendance = String(values[i][4] || '').trim();
    if (attendance === 'Có tham dự') count += guests;
  }

  const result = { count, updatedAt: new Date().toISOString() };
  const callback = e?.parameter?.callback;
  if (callback && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(result)});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
