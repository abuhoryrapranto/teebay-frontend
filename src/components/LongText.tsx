import { useState } from "react";

type Props = {
    text: string,
    maxLength: number,
    click?: () => void
}

const LongText = ({ text, maxLength, click } : Props) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = text.slice(0, maxLength);
  const shouldTruncate = text.length > maxLength;

  return (
    <div>
      <p className="text-left text-gray-800 text-sm font-medium mt-2">
        {showFullText ? (
          <>
            <span onClick={click}>{text}</span>
            {shouldTruncate && <span className="text-blue-500 cursor-pointer" onClick={toggleText}> ... Less Details</span>}
          </>
        ) : (
          <>
            <span onClick={click}>{truncatedText}</span>
            {shouldTruncate && <span className="text-blue-500 cursor-pointer" onClick={toggleText}> ... More Details</span>}
          </>
        )}
      </p>
    </div>
  );
};

export default LongText;
