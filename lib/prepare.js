const { template } = require("lodash");
const path = require("path");
const { readFile, writeFile, ensureFile } = require("fs-extra");
const resolveConfig = require("./resolve-config.js");

module.exports = async (pluginConfig, context) => {
  const { cwd, branch, lastRelease, nextRelease, logger } = context;
  const { notes } = nextRelease;
  const { changelogFile } = resolveConfig(pluginConfig);
  let { changelogTitle } = resolveConfig(pluginConfig);
  changelogTitle = template(changelogTitle)({ branch, lastRelease, nextRelease });

  logger.log("Branch: %s", branch?.name);
  logger.log("Title: %s", changelogTitle);

  const changelogPath = path.resolve(cwd, template(changelogFile)({ branch, lastRelease, nextRelease }));

  if (notes) {
    await ensureFile(changelogPath);
    const currentFile = (await readFile(changelogPath)).toString().trim();

    if (currentFile) {
      logger.log("Update: %s", changelogPath);
    } else {
      logger.log("Create: %s", changelogPath);
    }

    const currentContent =
      changelogTitle && currentFile.startsWith(changelogTitle)
        ? currentFile.slice(changelogTitle.length).trim()
        : currentFile;
    const content = `${notes.trim()}\n${currentContent ? `\n${currentContent}\n` : ""}`;

    await writeFile(changelogPath, changelogTitle ? `${changelogTitle}\n\n${content}` : content);
  }
};
