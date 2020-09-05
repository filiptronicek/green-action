# Green Action

Check how your project is affecting the planet

Read about it in my
[Dev.to](https://dev.to/filiptronicek/check-how-green-your-web-project-is-52c9)
post

Demo:

![carbon consumption of this project](https://green-action.vercel.app/api/card?p=78&type=grams)

## Setup

1. Open your README and add paste the following tag in there (this will be,
   where the image will be placed): `![carbon consumption of this project](https://green-action.vercel.app/api/card?p=78&type=grams)`
1. Add the following workflow to your .github/workflows folder:

```yaml
name: Website green-o-meter

on:
  push:
    branches: main

jobs:
  update-gist:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
        with:
          persist-credentials: false
          fetch-depth: 0
      - name: green-website
        uses: filiptronicek/green-action@main
        env:
          URL: https://dev.to #Your measured URL
      - name: Commit files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git commit -m "Update carbon image" -a
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: main #Change this to master, or any other branch to which the changes should be pushed
```

## Development

1. clone the repo (`git clone https://github.com/filiptronicek/green-action`)
1. change the URL in the env file (first create it): `cp .env.example .env`
