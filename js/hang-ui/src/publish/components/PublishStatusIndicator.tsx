import usePublishUIContext from "../hooks/use-publish-ui";

type PublishStatus = "no-url" | "disconnected" | "connecting" | "select-source" | "video-only" | "audio-only" | "live";
type StatusIndicatorType = "error" | "warning" | "success" | "connecting";

type StatusConfig = {
	type: StatusIndicatorType;
	text: string;
};

const STATUS_MAP: Record<PublishStatus, StatusConfig> = {
	"no-url": { type: "error", text: "No URL" },
	disconnected: { type: "error", text: "Disconnected" },
	connecting: { type: "connecting", text: "Connecting..." },
	"select-source": { type: "warning", text: "Select Source" },
	"video-only": { type: "success", text: "Video Only" },
	"audio-only": { type: "success", text: "Audio Only" },
	live: { type: "success", text: "Live" },
};

export default function PublishStatusIndicator() {
	const context = usePublishUIContext();

	const statusConfig = (): StatusConfig => {
		const status = context.publishStatus() as PublishStatus;
		return STATUS_MAP[status] || { type: "error", text: "Unknown" };
	};

	return (
		<div class="publish-ui__status-indicator flex--center">
			<span class={`publish-ui__status-indicator-dot publish-ui__status-indicator-dot--${statusConfig().type}`} />
			<span class={`publish-ui__status-indicator-text publish-ui__status-indicator-text--${statusConfig().type}`}>
				{statusConfig().text}
			</span>
		</div>
	);
}
