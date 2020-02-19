// Some themed icons .svg's aren't available in the github repo and can only
// be donwloaded from https://material.io/tools/icons
// This script automates the download
const fs = require('fs');
const https = require('https');
const path = require('path');

// Where to save downloaded icons
const DEST_FOLDER = path.resolve(__dirname, 'src', 'icons');
if (!fs.existsSync(DEST_FOLDER)) {
  fs.mkdirSync(DEST_FOLDER);
}

// List icons you want to get in ['icon_name', 'style'] format
const ICONS_TO_GET = [
  ['account_circle', 'baseline'],
  ['add', 'baseline'],
  ['add_circle', 'baseline'],
  ['arrow_back', 'baseline'],
  ['arrow_downward', 'baseline'],
  ['arrow_left', 'baseline'],
  ['arrow_right', 'baseline'],
  ['arrow_upward', 'baseline'],
  ['assessment', 'outline'],
  ['assignment', 'outline'],
  ['attach_file', 'baseline'],
  ['check_circle', 'baseline'],
  ['check_circle', 'outline'],
  ['close', 'baseline'],
  ['cloud_upload', 'baseline'],
  ['delete', 'baseline'],
  ['edit', 'baseline'],
  ['email', 'baseline'],
  ['error_outline', 'baseline'],
  ['expand_less', 'baseline'],
  ['expand_more', 'baseline'],
  ['filter_list', 'baseline'],
  ['group', 'outline'],
  ['help', 'baseline'],
  ['help_outline', 'baseline'],
  ['history', 'baseline'],
  ['info', 'baseline'],
  ['insert_chart', 'baseline'],
  ['lock', 'baseline'],
  ['menu', 'baseline'],
  ['new_releases', 'outline'],
  ['phone', 'baseline'],
  ['query_builder', 'baseline'],
  ['receipt', 'outline'],
  ['remove_red_eye', 'baseline'],
  ['save_alt', 'baseline'],
  ['search', 'baseline'],
  ['send', 'baseline'],
  ['stars', 'outline'],
  ['today', 'baseline'],
  ['work_outline', 'baseline'],
  ['exit_to_app', 'baseline'],
  ['settings', 'baseline'],
  ['euro_symbol', 'baseline'],
  ['euro_symbol', 'outline'],
  ['drafts', 'baseline'],
  ['drafts', 'outline'][('save', 'baseline')],
  ['save', 'outline'],
  ['more_horiz', 'baseline'],
  ['more_horiz', 'outline'],
  ['more_vert', 'baseline'],
  ['more_vert', 'outline'],
  ['content_copy', 'baseline'],
  ['content_copy', 'outline'],
  ['file_download', 'baseline'],
  ['file_download', 'outline'],
  ['file_upload', 'baseline'],
  ['file_upload', 'outline'],
  ['file_in_page', 'baseline'],
  ['file_in_page', 'outline'],
  ['print', 'baseline'],
  ['print', 'outline'],
  ['restore_page', 'baseline'],
  ['restore_page', 'outline'],
  ['refund', 'baseline'],
  ['refund', 'outline'],
  ['arrow-down-solid', 'baseline'],
  ['arrow-down-solid', 'outline'],
  ['arrow-left-solid', 'baseline'],
  ['arrow-left-solid', 'outline'],
  ['arrow-right-solid', 'baseline'],
  ['arrow-right-solid', 'outline'],
  ['arrow-up-solid', 'baseline'],
  ['arrow-up-solid', 'outline'],
  ['bars-solid', 'baseline'],
  ['bars-solid', 'outline'],
  ['bell', 'baseline'],
  ['bell', 'outline'],
  ['briefcase-solid', 'baseline'],
  ['briefcase-solid', 'outline'],
  ['building', 'baseline'],
  ['building', 'outline'],
  ['calendar', 'baseline'],
  ['calendar', 'outline'],
  ['chart-area-solid', 'baseline'],
  ['chart-area-solid', 'outline'],
  ['check-circle', 'baseline'],
  ['check-circle', 'outline'],
  ['clipboard-solid', 'baseline'],
  ['clipboard-solid', 'outline'],
  ['clock', 'baseline'],
  ['clock', 'outline'],
  ['cloud-download-alt-solid', 'baseline'],
  ['cloud-download-alt-solid', 'outline'],
  ['cloud-upload-alt-solid', 'baseline'],
  ['cloud-upload-alt-solid', 'outline'],
  ['download-solid', 'baseline'],
  ['download-solid', 'outline'],
  ['ellipsis-h-solid', 'baseline'],
  ['ellipsis-h-solid', 'outline'],
  ['ellipsis-v-solid', 'baseline'],
  ['ellipsis-v-solid', 'outline'],
  ['envelope', 'baseline'],
  ['envelope', 'outline'],
  ['exclamation-circle-solid', 'baseline'],
  ['exclamation-circle-solid', 'outline'],
  ['eye-slash', 'baseline'],
  ['eye-slash', 'outline'],
  ['eye', 'baseline'],
  ['eye', 'outline'],
  ['file-invoice-solid', 'baseline'],
  ['file-invoice-solid', 'outline'],
  ['file-pdf', 'baseline'],
  ['file-pdf', 'outline'],
  ['info-circle-solid', 'baseline'],
  ['info-circle-solid', 'outline'],
  ['lock-solid', 'baseline'],
  ['lock-solid', 'outline'],
  ['long-arrow-alt-down-solid', 'baseline'],
  ['long-arrow-alt-down-solid', 'outline'],
  ['long-arrow-alt-left-solid', 'baseline'],
  ['long-arrow-alt-left-solid', 'outline'],
  ['long-arrow-alt-right-solid', 'baseline'],
  ['long-arrow-alt-right-solid', 'outline'],
  ['long-arrow-alt-up-solid', 'baseline'],
  ['long-arrow-alt-up-solid', 'outline'],
  ['pen-solid', 'baseline'],
  ['pen-solid', 'outline'],
  ['plus-circle-solid', 'baseline'],
  ['plus-circle-solid', 'outline'],
  ['print-solid', 'baseline'],
  ['print-solid', 'outline'],
  ['question-circle', 'baseline'],
  ['question-circle', 'outline'],
  ['search-minus-solid', 'baseline'],
  ['search-minus-solid', 'outline'],
  ['search-plus-solid', 'baseline'],
  ['search-plus-solid', 'outline'],
  ['search-solid', 'baseline'],
  ['search-solid', 'outline'],
  ['sliders-h-solid', 'baseline'],
  ['sliders-h-solid', 'outline'],
  ['star', 'baseline'],
  ['star', 'outline'],
  ['tachometer-alt-solid', 'baseline'],
  ['tachometer-alt-solid', 'outline'],
  ['times-circle', 'baseline'],
  ['times-circle', 'outline'],
  ['times-solid', 'baseline'],
  ['times-solid', 'outline'],
  ['trash-alt', 'baseline'],
  ['trash-alt', 'outline'],
  ['upload-solid', 'baseline'],
  ['upload-solid', 'outline'],
  ['user-solid', 'baseline'],
  ['user-solid', 'outline'],
  ['clipboard-list-solid', 'baseline'],
  ['clipboard-list-solid', 'outline'],
  ['file-csv-solid', 'baseline'],
  ['file-csv-solid', 'outline'],
  ['tags-solid', 'baseline'],
  ['tags-solid', 'outline'],
  ['portail-logo', 'baseline'],
  ['portail-logo', 'outline']
];

// Get svg download link
let iconUrl = (icon, style = 'baseline') =>
  `https://material.io/tools/icons/static/icons/${style}-${icon}-24px.svg`;

// Path to save to save
let iconFilePath = (icon, style = 'baseline') =>
  path.resolve(
    DEST_FOLDER,
    style === 'baseline' ? `${icon}.svg` : `${icon}_${style}.svg`
  );

// Download (thanks https://stackoverflow.com/a/22907134/723891)
let download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  https
    .get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on('error', function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};

// Download each icon (if it wasn't already)
ICONS_TO_GET.forEach(([icon, style]) => {
  let path = iconFilePath(icon, style);
  if (!fs.existsSync(path)) {
    download(iconUrl(icon, style), path);
  }
});
