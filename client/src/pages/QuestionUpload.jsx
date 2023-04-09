import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const overlayVariants = {
  inital: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 1,
    transition: { duration: 0.1 },
  },
};

const pageVariants = {
  inital: {
    opacity: 1,
    scale: 0,
    transition: { type: "linear", duration: 0.3 },
  },
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 1,
    transition: { type: "linear", duration: 0.1 },
  },
};

const buttonVariants = {
  inital: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0 },
  },
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 1,
    transition: { duration: 0.1 },
  },
};

const QuestionUpload = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError } = useForm();
  const [clickUploadTrigger, setClickUploadTrigger] = useState(false);
  // 키워드
  const [keywords, setKeywords] = useState([]);
  const [keywordsValue, setKeywordsValue] = useState("");

  const onValid = (data) => {
    let formData = new FormData();

    console.log(data);
  };

  // input 에 엔터 키 눌렀을 때 submit 방지
  const onEnterDown = (event) => {
    const {
      target: { nodeName },
    } = event;

    if (nodeName === "INPUT" && event.key === "Enter") {
      event.preventDefault();
    }
  };

  /** 업로드 화면으로 이동 */
  const onClickUpload = () => {
    setClickUploadTrigger(true);
  };

  /** 질문 페이지로 이동 */
  const onClickQuestion = () => {
    setClickUploadTrigger(false);
    navigate("/qna");
  };

  /** textarea 높이 실시간 감지 및 변화 */
  const handleResizeHeight = (event) => {
    event.target.style.height = "234px";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  /** 키워드 입력 */
  const handleKeywords = (event) => {
    const {
      target: { value },
    } = event;

    if (event.key === "Enter" && value !== "") {
      const {
        target: { value },
      } = event;
      setKeywords([...keywords, value]);
      setKeywordsValue("");
    }
  };

  /** 키워드 input 입력 값 상태 관리 */
  const onChange = (event) => {
    setKeywordsValue(event.target.value);
  };

  /** 키워드 삭제 */
  const handleDelKeywords = (index) => {
    const keywordsArr = keywords.filter((words, idx) => idx !== index);
    setKeywords([...keywordsArr]);
  };
  return (
    <>
      <AnimatePresence>
        {clickUploadTrigger ? (
          <>
            <Overlay
              onClick={onClickQuestion}
              variants={overlayVariants}
              initial="inital"
              animate="visible"
              exit="hidden"
            />
            <UploadPage
              variants={pageVariants}
              initial="inital"
              animate="visible"
              exit="hidden"
            >
              <form onKeyDown={onEnterDown} onSubmit={handleSubmit(onValid)}>
                <Group>
                  <Title>
                    <label>제목</label>
                  </Title>
                  <Input {...register("title")} />
                </Group>
                <Group>
                  <Title>
                    <label>내용</label>
                  </Title>
                  <Textarea
                    rows={1}
                    {...register("details", {
                      onChange: handleResizeHeight,
                    })}
                  />
                </Group>
                <Group>
                  <Title>
                    <label>키워드</label>
                  </Title>
                  <Input
                    id="keywords"
                    onKeyDown={handleKeywords}
                    onChange={onChange}
                    value={keywordsValue}
                    placeholder="키워드를 입력하세요"
                  />
                  <KeywordsBox>
                    {keywords.map((word, index) => {
                      return (
                        <Keyword key={index}>
                          <div>{word}</div>
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => handleDelKeywords(index)}
                          />
                        </Keyword>
                      );
                    })}
                  </KeywordsBox>
                </Group>
                <Group>
                  <UploadButton>질문 등록</UploadButton>
                </Group>
              </form>
            </UploadPage>
          </>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {!clickUploadTrigger ? (
          <UploadTrigger
            onClick={onClickUpload}
            variants={buttonVariants}
            initial="inital"
            animate="visible"
            exit="hidden"
          >
            <Box>
              <div>질문등록</div>
            </Box>
          </UploadTrigger>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default QuestionUpload;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const UploadPage = styled(motion.div)`
  position: fixed;
  width: 90vw;
  height: 70vh;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  z-index: 15;
  overflow: auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #217af4; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

const UploadTrigger = styled(motion.div)`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  right: 15px;
  bottom: 55px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
`;

const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 13px;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  border-width: 0;
  border: 2px solid rebeccapurple;
  border-radius: 5px;
  font-size: 15px;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 230px;
  line-height: 27px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  border-width: 0;
  border: 2px solid rebeccapurple;
  border-radius: 5px;
  font-size: 15px;
  overflow: hidden;
`;

const KeywordsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
`;

const Keyword = styled.div`
  display: flex;
  width: max-content;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  svg {
    margin-left: 5px;
    cursor: pointer;
  }
`;

const UploadButton = styled.button`
  height: 35px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    &:first-child {
      font-size: 16px;
    }
    &:last-child {
      font-size: 12px;
      font-weight: bold;
    }
  }
`;
