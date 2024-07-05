type Props = {};

const ReLoading = (props: Props) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600">
          Loading
        </div>
      </div>
    </div>
  );
};

export default ReLoading;
