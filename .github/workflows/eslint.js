import { exec } from "child_process";
import { exit } from "process";

exec("npx eslint -f json", (err, stdout) => {
  if (!err) {
    // Everything is fine, so we can skip
    exit(0);
  }

  const data = JSON.parse(stdout);

  for (const v of data) {
    if (!v.messages?.length) {
      // this file is fine, skip.
      continue;
    }

    for (const message of v.messages) {
      const args = {
        file: v.filePath,
        line: message.line,
        endLine: message.endLine,
        col: message.column,
        endColumn: message.endColumn,
        title: "eslint",
      };
      const argstr = Object.entries(args)
        .map(([k, v]) => `${k}=${v}`)
        .join(",");
      console.log(`::error ${argstr}::${message.message}`);
    }
  }

  exit(1);
});
