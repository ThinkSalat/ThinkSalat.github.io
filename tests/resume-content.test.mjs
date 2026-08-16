import assert from 'node:assert/strict';
import test from 'node:test';
import { experience } from '../src/data/resume.ts';

test('Duckbill bullets match the approved copy exactly', () => {
  const duckbill = experience.find(({ company }) => company === 'Duckbill AI');

  assert.ok(duckbill);
  assert.equal(duckbill.dates, 'September 2024 – July 2026');
  assert.deepEqual(duckbill.bullets, [
    'Led the migration of our calendaring and telephony platforms from Retool to a modern React monorepo, reaching feature parity plus new stakeholder requirements in two weeks and eliminating  ~$75K/year in platform savings.',
    'Designed an agentic development workflow spanning the legacy and new codebases, orchestrating collaborating coding agents to discover requirements, exchange context, and generate nearly the entire implementation.',
    'Rebuilt and redesigned an outdated browser extension using WXT into a core agent workspace, architecting a background-service façade and idempotent messaging layer to synchronize task context, notes, activity telemetry, and API state across ephemeral side panels, tabs, and windows.',
    "Pioneered and helped architect our generative UI system, evolving a text-only AI chat into a dynamic application surface where the model could invoke purpose-built interfaces through a custom DSL and tool calls.",
    "Built the system's first and many subsequent AI-driven experiences—including interactive maps and directions, rich recommendation carousels, contextual forms, artifacts, and UI for human-in-the-loop actions across phone, email, and calendar.",
  ]);
});
