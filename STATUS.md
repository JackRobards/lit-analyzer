# Status

This repository is a monorepo for tooling related to the [lit-analyzer](https://github.com/runem/lit-analyzer) package originally created by Rune Mehlsen. Rune and members of the Lit team have done a lot of awesome work creating and maintaining this set of packages that improve the DX of working with Lit. All credit and thanks for the ideas and core functionality here should go to them!

This fork is intended to carry on this awesome work, and see where it can keep improving from here.

## Why Create this Fork?

The updates in the original repository have been infrequent ever since Rune was unfortunately unable to continue updating the project. Especially in the last ~2 years updates haven't been very frequent, packages have fallen out of date (with some security vulnerabilities popping up), and PRs/issues have gone without any response. This is totally understandable, as there is a lot of other work to do around Lit, and their team only has so many resources. And life happens sometimes too boot 😆.

So, this fork was created to get things up to date and to try to keep things working while the tools are still useful to the community.

### Future Updates?

There is no roadmap for this tool, or specific plans. There are plenty of things that could be fixed, improved, or added, but we will have to see what is feasible since I am still learning this codebase. As outlined in the "Other Analyzers" section, I believe it is likely these packages eventually get replaced with something better so my focus for now is on "keeping the lights on" and small improvements. I will try to review any PRs though, if anyone wants to contribute back to these packages!

I'd be happy to consider merging this work to the parent repository, as long as there is someone to help release it and also future potential updates. If any owner of the repo wants to talk about how we can do something like that, then feel free to reach out! I'd also be happy to add any of you all as Codeowners on this repo if that'd be easier.

## Other Analyzers

The [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) is a tool for generating a [Custom Element Manifest file](https://github.com/webcomponents/custom-elements-manifest). The `web-component-analyzer` package in this repository is a similar idea, but to my understanding is based on an earlier version of the file format while it was still in development. I am not sure exactly how much the two tools differ, and this is something I still need to do some research into understanding.

There is also the [@lit-labs/analyzer](https://www.npmjs.com/package/@lit-labs/analyzer) package from the Lit team. It does not use the CEM analyzer mentioned above, but still works with the Custom Element Manifest file format. Hopefully in the future a tool based on the @lit-labs package will replace the packages in this repo, but the @lit-labs package (and any additional tooling built on top of it) is [not yet ready](https://github.com/lit/lit/issues/2993). Until it is, then packages like the `lit-analyzer` CLI and `lit-analyzer-plugin` VSCode extension are some of the best choices for working with Lit and so this fork aims to keep help keep them up to date.

The Lit team also have [this RFC](https://github.com/lit/rfcs/pull/41) outlining some of their potential plans for their own Language Server and VSCode extension. As mentioned in that RFC, there could be a _slight_ chance that the original packages forked as part of this repo could be a part of that, but it would be a pretty large undertaking to repurpose these tools to use the `@lit-labs/analyzer`.

As a shoutout, some of the tools by break-stuff are great if you are wanting to generate a custom element manifest file. I would highly recommend checking them out:
https://github.com/break-stuff/cem-tools
