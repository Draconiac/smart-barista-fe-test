type Props = {
  id: string;
  name: string;
  isActive: boolean;
  onButtonClick?: () => void;
};

export default function Table({ id, name, onButtonClick }: Props) {
  return (
    <div style={{width: 100,height: 100,backgroundColor: "white"}}
    >
      <div>
        <button onClick={onButtonClick}>•</button>
      </div>
      <div>{name}</div>
    </div>
  );
}
