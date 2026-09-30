type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="dashboard-card"
    >
      <div
        className="dashboard-card-accent"
      />

      <p
        className="dashboard-card-label"
      >
        {title}
      </p>

      <h1
        className="dashboard-card-value"
      >
        {value}
      </h1>
    </div>
  );
}
