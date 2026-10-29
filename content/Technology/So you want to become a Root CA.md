---
title: So you want to become a Root CA?
draft: false
tags:
  - Technology
  - Security
  - Browsers
created: 2026-10-29
modified:
---
Chances are you followed the whole eMudhra story, thought “if they managed it with security like _that_, surely I can too,” and clicked on this post.

![](https://x.com/Scott_Helme/status/2112952215878939052)

Great! Congratulations on taking the first step. The road ahead involves a lot of reading (certificate policies, audit criteria, root program requirements, and legislation) before you can even begin.

Jokes aside, it’s a fair question. How does a random company end up in a position where its mistakes become everyone’s problem? Who approves that, and what does an applicant actually have to do?

And if it’s just a checklist, why aren’t there more of them? Here’s how many organizations each major root program trusts (via CCADB, as of October 2026):

| Program   | Root certificates | CA owners |
| --------- | ----------------: | --------: |
| Apple     |               122 |        39 |
| Chrome    |               101 |        44 |
| Microsoft |               181 |        61 |
| Mozilla   |               118 |        47 |

A few dozen organizations, trusted by essentially every device on the planet. That’s actually insane!

I went looking for a good writeup explaining how this all works and couldn’t find one, so I spent a few hours putting this together in case you’re curious too :)

But of course, if you want to _be_ a Root CA, you’ll first need to know…

# Why do we need a Root CA anyway?

When you opened `kuber.studio` to read this, just encryption can't guarentee you're actually directly talking to my server.

![Man-in-the-middle attack: a perpetrator sits between the user and the web application, replacing their original connection with two new ones](https://cdn.kuber.studio/assets/media/root-ca/man-in-the-middle.jpg)

Picture someone sitting between us, they generate their own encryption key and hand it to you, they read everything you send, then forward it to me. Everything’s "encrypted", but all of our data is essentially leaked.
That’s a **man-in-the-middle attack**, and it’s why [TLS also has to authenticate the server](https://www.rfc-editor.org/rfc/rfc8446.html), proving that the public key you received really belongs to the domain you meant to visit.

That proof is a **digital certificate**. which is issued by a certificate authority (CA) after checking that you actually control your domain. Your browser then checks the same and then follows the chain of trust back to a **trust anchor**: a root certificate it already has baked in.

(PS: [this segment by ThePrimeagen](https://youtu.be/O905JwSgoi4?si=pbW4I1l2KdZr27uf&t=89) has a great first principles explanation on this)

now that we know this, the obvious question remains.

# Who decided these companies should be trusted?

Funnily enough, we never got a new arrangement for the internet, we inherited how it worked in the SSL era. The major browsers just started shipping trusted certificates with their software.

You can watch that informal arrangement harden into policy in [Frank Hecker’s 2005 proposal for Mozilla’s CA policy](https://frankhecker.com/2005/04/14/mozilla-ca-certificate-policy-submitted-for-consideration/). He suggested accepting CAs that passed a WebTrust or equivalent independent audit, while admitting an audit proves a CA follows its own policies, not that those policies are good enough to protect the internet.

By [2008](https://www-archive.mozilla.org/projects/security/certs/policy/), Mozilla had formalized a public process requiring independent evidence and published policies, charging no inclusion fee while reserving the right to reject or remove CAs. Of course funnily enough, applications are still filed on Mozilla's bug portal and it became even more specific with the [CA/Browser Forum's TLS Baseline Requirements](https://cabforum.org/working-groups/server/baseline-requirements/requirements/) ; not including the other conditions other browsers have for the same.

You can probably see where this is going.

# Okay but how do I ACTUALLY Start

First you gotta know that there's levels to this.

If this is for your own servers or devices, great ! You can create a private CA and install its root on the devices you control.

If you want to issue legally recognised digital signatures, your country's rules enter the picture. An Indian licence to sign tax filings, for example, doesn't make Firefox trust you to authenticate websites.

But you want **public browser trust**. You'd like strangers' computers to accept your signatures without anyone installing anything.

Ambitious. Let's see your finances.

## Get funding, then maybe a licence

Before anything else, you’ll want serious, long-term money. Major examples I cover here include Google’s [own CA operation](https://security.googleblog.com/2017/01/the-foundation-of-more-secure-web.html), Fastly’s [Certainly](https://www.fastly.com/blog/announcing-certainly-fastlys-own-tls-certification-authority), and Let’s Encrypt (a nonprofit whose founders [raised corporate funding](https://www.isrg.org/documents/letsencryptCCS2019.pdf) to pay for hardware and staff.) You don’t personally need to be a millionaire (it usually does help though,) but you’ll want to arrive with people willing to fund this for years.

Next, depending on where you are, the government most likely want a say, browsers don’t require a national licence (Let’s Encrypt never needed one), but some countries regulate anyone offering certificate services.

India, interestingly asks companies entering its regulated CA business for **₹50 crore in net worth (roughly $5.3 million)** plus ₹5 crore in paid-up capital before you can even apply.

Here's a few of these I compiled:

| Jurisdiction             | Relevant law or scheme                                                                                                                                                                                                                   | What the local approval involves                                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **India**                | Information Technology Act 2000; IT (Certifying Authorities) Rules 2000; [CCA licensing guidelines](https://cca.gov.in/sites/files/pdf/guidelines/CCA-CALIC.pdf)                                                                         | A licence from the Controller of Certifying Authorities, with financial eligibility, an infrastructure assessment and an empanelled audit.                                                                                                              |
| **United States**        | [E-SIGN Act, 15 USC §7001](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title15-section7001)                                                                                                      | Recognises electronic signatures, but creates no CA licence or browser-root process.                                                                                                                                                                    |
| **European Union**       | [eIDAS, as amended by Regulation 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj/eng)                                                                                                                                          | Qualified trust services need conformity assessment, national supervision and trusted-list status. It also places specific obligations on browsers for qualified website certificates.                                                                  |
| **United Kingdom**       | UK eIDAS framework; Electronic Identification and Trust Services Regulations 2016; [ICO qualification process](https://ico.org.uk/for-organisations/guide-to-eidas/becoming-a-qualified-trust-service-provider/)                         | An accredited body assesses you, then the ICO grants qualified status and trusted-list entry. Reassessment at least every 2 years.                                                                                                                      |
| **China**                | [Electronic Signature Law](https://www.miit.gov.cn/jgsj/zfs/fl/art/2022/art_e3f623f70c23497e88a941170093446a.html); electronic-certification service rules                                                                               | Permission from MIIT plus cryptographic approval. The [application guide](https://ythzxfw.miit.gov.cn/bssx/axy/dzrzfw/art/2020/art_7760cc01a60947269bf82c1edb9f1f9b.html) asks for at least 30 relevant staff and RMB 30 million in registered capital. |
| **Singapore**            | Electronic Transactions Act 2010; Certification Authority Regulations 2010; [IMDA scheme](https://www.imda.gov.sg/regulations-and-licensing-listing/electronic-transactions-act-and-regulations/controller-of-certification-authorities) | Voluntary accreditation.                                                                                                                                                                                                                                |
| **Japan**                | [Act on Electronic Signatures and Certification Business](https://www.digital.go.jp/en/policies/digitalsign/digitalsign_law)                                                                                                             | Optional accreditation for certification businesses that meet the statutory requirements.                                                                                                                                                               |
| **Brazil**               | Provisional Measure 2,200-2/2001; [ICP-Brasil accreditation](https://www.gov.br/iti/pt-br/acesso-a-informacao/perguntas-frequentes/icp-brasil)                                                                                           | You join a national hierarchy headed by ITI after documentary, financial and technical checks and a pre-operational audit.                                                                                                                              |
| **Australia**            | [Gatekeeper PKI Framework](https://www.finance.gov.au/government/whole-government-ict-and-digital-services/gatekeeper-public-key-infrastructure-pki-framework)                                                                           | Government PKI accreditation, being retired on **April 6, 2028**.                                                                                                                                                                                       |
| **United Arab Emirates** | Federal Decree-Law 46/2021; [TDRA trust-services licensing](https://tdra.gov.ae/en/Services/new-application-for-trust-services-license)                                                                                                  | Licensing with conformity documentation and review. AED 10,000 to apply, then AED 12,000 per trust service or AED 15,000 per qualified one.                                                                                                             |

There's varience to each process but in most places it's:

before building the infrastructure, you present your business plan, expertise and proposed facilities to the authority.
Once that clears, you build the setup; it must be ready before submitting the application.
Then come document checks, an audit of the software and facilities, corrections, and approval.

That's the formal way of saying, you need to have some skin in the game before for the regulators to even take your plan seriously and if you genuinely manage capital, it's likely because you are largely operating through established digital-signature businesses or regulatory companies.

## Hire a lot of people and generate the keys

Qualified? Congratulations! Now you need engineers, security and compliance staff, secure facilities, backups, and a lot of customer support.

Your private keys stay in a **hardware security module** (HSM) and surprisingly the hardware is probably the easiest part. The Baseline Requirements ask for FIPS 140 Level 3 or equivalent, and even something as small as a [YubiHSM 2](https://docs.yubico.com/hardware/yubihsm-2/hsm-2-user-guide/hsm2-intro-overview.html) comes in a validated version.

Generating a root key is a whole event too, there's a formal **key ceremony** with designated participants, a scripted procedure, and an auditor either watching in person or reviewing a full video.

If you're interested, [here's eMudhra's last ceremony's disclosure that got independently audited.](https://repository.emsign.com/downloads/auditreports/emSignRootKGC2024.pdf)

Then the issuance system. It has to validate domains, sign certificates, publish revocation information, and actually revoke things when needed. This is all documented in your Certificate Policy and Certification Practice Statement, then gets independently audited under **WebTrust or ETSI** standards.

## "We'd be Delighted to *Consider* your Application"

Now you can finally apply! That goes through the [Common CA Database](https://www.ccadb.org/) (CCADB), which collects your certificates, policies, audits and ownership details.

Meeting the requirements should get you in, right?

Well, no.
All root programs actually make their own decision.

Mozilla needs the hierarchy, key-generation evidence, audit reports and a compliance assessment and then the approval is their choice. So is Google and Apple.

Microsoft is not even accepting new CAs.

![Microsoft's notice that it is not accepting new CAs](https://cdn.kuber.studio/assets/media/root-ca/microsoft-not-accepting-new-cas.jpg)

For a sense of the timeline, look at **TrustAsia**. It [applied to Mozilla in January 2021](https://bugzilla.mozilla.org/show_bug.cgi?id=1688854), went back and forth with audit updates, key-generation evidence and revised assessments, and finally entered public discussion in **July 2023**. Approval came later that August, and its roots shipped in Firefox 121 later that year.

That's almost 3 years, for a company already in the certificate business.

And then it did it ALL again. Its new dedicated TLS and email roots went through [another public discussion in 2025](https://groups.google.com/a/ccadb.org/g/public/c/clTruHb98og) and a [separate Chrome approval](https://groups.google.com/a/ccadb.org/g/public/c/gi39frJDqic). Every new root plays the same waiting game.

## You're approved. What about everybody's old phone?

Getting into devices is not easy either, when was the last time you updated your Alexa or TV's CA list?

Let’s Encrypt [generated its first root in June 2015](https://letsencrypt.org/2015/06/04/isrg-ca-certs) and issued its first certificate that September. It wasn’t [directly trusted by all the major root programs](https://letsencrypt.org/2018/08/06/trusted-by-all-major-root-programs) until July 2018, and even then, plenty of older devices never really got the update.

The workaround is **cross-signing**: a CA that’s already trusted signs your CA’s key, so old clients can follow the chain back to a root they already know. Let’s Encrypt leaned on IdenTrust for this.

![Let's Encrypt's 2015 hierarchy with IdenTrust cross-signatures](https://cdn.kuber.studio/assets/media/root-ca/letsencrypt-2015-identrust-cross-sign.png)

The catch is that you need an established CA willing to vouch for you. The other option is buying a root outright, as [Google did with GlobalSign’s R2 and R4 in 2017](https://security.googleblog.com/2017/01/the-foundation-of-more-secure-web.html), though a change of ownership still takes time to get reviewed by the root programs.

Let’s Encrypt looked into buying one too. Its founders [reported quotes of $1–8 million](https://www.isrg.org/documents/letsencryptCCS2019.pdf) depending on the root’s remaining lifetime, compatibility and baggage, and never went through with it.

# What's the business model here?

For commercial CAs, it’s selling certificates and managing them. TrustAsia, for example [charges for issuance, renewal and related services](https://repository.trustasia.com/en/repo/cps/adoc/v2.2.0) and sells certificate-management products on top.

For platform companies, the payoff is indirect. Fastly [built Certainly](https://www.fastly.com/blog/announcing-certainly-fastlys-own-tls-certification-authority) after other CAs’ incidents kept hitting its customers, bringing issuance in-house for reliability and support.

Let’s Encrypt is the nonprofit version of this, [funded by sponsors, grants and donations](https://letsencrypt.org/docs/faq/) to get HTTPS everywhere. Its operators [reported spending roughly **$3 million in 2018**](https://www.isrg.org/documents/letsencryptCCS2019.pdf), not counting reserves or in-kind contributions, with about two-thirds going to staff. 

### So why aren’t there more of them?

By now you’ve seen why the number is so small. It takes capital, specialist staff, audits, years of waiting, and a reason for browsers to want another issuer. Most businesses are better off buying certificates from someone already trusted.

Browsers also rightfully have a good reason to be picky. Any trusted CA can issue a certificate for _any_ domain.

# Congratulations, You've Done it

Now the real job starts. You get audited every year, update your systems every time the rules change, and answer in public for any issue. Under the [CCADB incident rules](https://www.ccadb.org/cas/incident-report), you generally owe an initial report within 72 hours of finding out and a full report within 14 days of that.

Even leaving takes a lot of work, eMudhra’s [exit announcement](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) committed to keeping certificate-status services running until every certificate it issued had expired or been replaced, which would take years.

## And this made me question the entire process

If it really was that easy to track all the applications, objections, audit statements and failures, even though they were scattered, I'm genuinely shocked we don't have better ways to keep it all in check.

I'm even more shocked about the eMudhra incident passing all the independent audits, checks and reports even after being in the game for so long with those security casualties.

If you've seen me online or read my blogs, I'm very optimistic about the progress AI brings to society, especially in technology -<span></span>- but seeing the infrastructure issues with such a "load bearing" (pun unintended) part of the internet, which is largely considered very hard to break into does make me think.

What Hecker admitted in 2005 is still true more than a decade later, an audit proves a CA follows _its own_ policies, not that those policies are good enough. Perchance.

