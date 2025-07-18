import { handleErrorWithSentry /*replayIntegration*/ } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

export function init() {
	Sentry.init({
		dsn: 'https://b7fb355f8d1fe0bb052585161dce4a1e@o4509551707160576.ingest.us.sentry.io/4509551708012544',

		tracesSampleRate: 1.0,

		// This sets the sample rate to be 10%. You may want this to be 100% while
		// in development and sample at a lower rate in production
		replaysSessionSampleRate: 0.1,

		// If the entire session is not sampled, use the below sample rate to sample
		// sessions when an error occurs.
		replaysOnErrorSampleRate: 1.0

		// If you don't want to use Session Replay, just remove the line below:
		// integrations: [replayIntegration()],
	});
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
