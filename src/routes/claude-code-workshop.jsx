import ClaudeCodeWorkshopPresentation from '../components/ClaudeCodeWorkshopPresentation';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({
    title: 'Claude Code workshop | Simon Amtoft Pedersen',
    description: 'A practical Claude Code workshop: choosing a task, working safely with files, using Plan mode, and moving from prototype to production.',
    path: '/talks/claude-code-workshop',
  });
}

export default function ClaudeCodeWorkshopRoute() {
  return <ClaudeCodeWorkshopPresentation />;
}
