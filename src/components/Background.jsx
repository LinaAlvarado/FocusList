const Background = () => {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.8) 100%)",
          }}
        ></div>
  
        <div className="absolute w-full h-full">
          <div className="absolute w-96 h-96 -left-48 -top-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    );
  };
  
  export default Background;
  