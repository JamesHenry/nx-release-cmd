// @ts-check
const { releaseVersion, releaseChangelog } = require("nx/release");
const yargs = require("yargs");

(async () => {
  const options = await yargs
    .version(false)
    .option("version", {
      type: "string",
    })
    .option("dryRun", {
      alias: "d",
      type: "boolean",
      default: true,
    })
    .option("verbose", {
      type: "boolean",
      default: false,
    })
    .parseAsync();
  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
  });
  const status = await releaseChangelog({
    version: workspaceVersion,
    versionData: projectsVersionData,
    dryRun: options.dryRun,
    verbose: options.verbose,
  });
  process.exit(status);
})();
