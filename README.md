# @newbish/changelog

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to create or update a changelog file.

[![Build Status](https://github.com/newbish/changelog/workflows/Test/badge.svg)](https://github.com/newbish/changelog/actions?query=workflow%3ATest+branch%3Amain) [![npm latest version](https://img.shields.io/npm/v/@newbish/changelog/latest.svg)](https://www.npmjs.com/package/@newbish/changelog)
[![npm next version](https://img.shields.io/npm/v/@newbish/changelog/next.svg)](https://www.npmjs.com/package/@newbish/changelog)

| Step               | Description                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verify the `branch`, `changelogFile` and `changelogTitle` options configuration.                                                                                                                      |
| `prepare`          | Create or update a changelog file in the local project directory with the changelog content created in the [generate notes step](https://github.com/semantic-release/semantic-release#release-steps). |

## Install

```bash
$ npm install @newbish/changelog -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@newbish/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md",
        "branches": ["main"]
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["docs/CHANGELOG.md"]
      }
    ]
  ]
}
```

With this example, for each release, a `docs/CHANGELOG.md` will be created or updated.

## Configuration

### Options

| Options          | Description                                           | Default        |
| ---------------- | ----------------------------------------------------- | -------------- |
| `changelogFile`  | File path of the changelog.                           | `CHANGELOG.md` |
| `changelogTitle` | Title of the changelog file (first line of the file). | -              |
| `branches`       | A array of branches to write a changelog for.         | All branches   |

### Examples

When used with the [@semantic-release/git](https://github.com/semantic-release/git) or [@semantic-release/npm](https://github.com/semantic-release/npm) plugins the `@newbish/changelog` plugin must be called first in order to update the changelog file so the [@semantic-release/git](https://github.com/semantic-release/git) and [@semantic-release/npm](https://github.com/semantic-release/npm) plugins can include it in the release.

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@newbish/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
}
```

## Advanced

The changelogFile and changelogTitle parameters can be dynamically generated when setup as a template.

```json
{
  "plugins": [
    ...
    [
      "@newbish/changelog",
      {
        "changelogFile": "CHANGELOG<%= branch.name !== 'main' ? `-${branch.name}` : '' %>.md",
        "changelogTitle": "---\ntitle: Changelog<%= branch.name != 'main' ? '- Next Branch' : '' %>\n---",
        "branches": [
          "main",
          "next"
        ]
      }
    ],
    ...
    ]
}
```
