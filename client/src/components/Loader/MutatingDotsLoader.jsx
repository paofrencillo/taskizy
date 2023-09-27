import { MutatingDots } from "react-loader-spinner";

export default function MutatingDotsLoader() {
  return (
    <>
      <MutatingDots
        height="100"
        width="100"
        color="rgb(107, 33, 168)"
        secondaryColor="rgb(107, 33, 168)"
        radius="12"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}
