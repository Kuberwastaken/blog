---
title: "wf-187f5ae9-aee · journal"
---

Added a local, user-editable model-metadata override that layers cleanly as user override > models.dev > built-in defaults, fixing wrong context window / max-output-tokens for self-hosted OpenAI-compatible endpoints and aliases models.dev does not know.

Design: the ModelRegistry is the single source of truth — App::refresh_context_window_size (token warnings), compact::resolve_context_window (auto-compact), and the picker's catalog projection all read registry.get()/list_*_by_provider(). So correcting the registry corrects all of them.

Changes:
- crates/core (config): new ModelOverride type {contextWindow, maxOutputTokens, name, releaseDate, status}, all optional, camelCase or snake_case. Added model_overrides maps to Settings (top level) and Config (nested block), merged in effective_config() and Settings::merge() following the existing providers/provider_configs convention.
- crates/api (model_registry): ModelRegistry retains the overrides and applies them over the catalog — patches existing entries in place, and materialises a synthetic entry for any provider/model key the catalog lacks (self-hosted alias). Re-asserted after every load_cache() and refresh_from_models_dev() so a later catalog merge can't clobber them.
- Wiring: App::new, App::apply_provider_refresh, CLI load_cached_model_registry, the `claurst models` listing, and the live-discovery picker path (self-hosted endpoints show corrected context window).
- Docs: docs/providers.md "Overriding model metadata" section + annotated settings.json example + configuration.md cross-reference.

Config syntax (settings.json top level or under config), keyed by provider/model:
"modelOverrides": { "custom-openai/my-local-llm": { "contextWindow": 32768, "maxOutputTokens": 4096, "name": "My Local LLM" } }