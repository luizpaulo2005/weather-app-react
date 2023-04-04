interface CardProps {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export const Card = (props: CardProps) => {
  return (
    <div className="border p-4 rounded-md min-w-[300px] max-w-full">
      <p className="font-extrabold text-4xl">{props.location.name}</p>
      <p className="">{props.location.region}</p>
      <p className="">{props.location.country}</p>
      <hr className="my-2" />
      <div className="flex flex-col justify-center">
        <p className="text-center my-4 font-extrabold text-4xl">
          {props.current.temp_c}
        </p>
        <p className="text-center">{props.current.condition.text}</p>
        <img className="" src={props.current.condition.icon} alt="icon" />
      </div>
    </div>
  );
};
