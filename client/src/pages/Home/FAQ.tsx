import React, { useState } from 'react'

export default function FAQ() {
  const data = [
    {
      question: 'Birinci Soru?',
      answer: 'Birinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    },
    {
      question: 'İkinci Soru?',
      answer: 'İkinci Soru Cevabı'
    }
    // Diğer soru ve cevapları ekleyin
  ]

  const [isExpanded, setExpanded] = useState(Array(data.length).fill(false))

  const handleToggle = index => {
    const newIsExpanded = [...isExpanded]
    newIsExpanded[index] = !newIsExpanded[index]
    setExpanded(newIsExpanded)
  }

  return (
    <div className="h-90vh relative">
      <h2 className="globalh2 text-30px my-10 text-center">Sıkça Sorulan Sorular:</h2>
      <div className="transition-all">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleToggle(index)}
            className=" bg-secondary hover:bg-secondary/80 globalPadding globalRounded mb-4 cursor-pointer active:cursor-grabbing	"
          >
            <div className="globalPadding flex items-center">
              <div className="text-18px font-600">
                {index + 1}) {item.question}
              </div>
              <div className="text-18px font-600 animate-fade-in-bottom-left ml-auto transition-all">
                {isExpanded[index] ? '-' : '+'}
              </div>
            </div>
            <div
              className={`animate-fade-in globalPadding ${isExpanded[index] ? 'transition-all' : 'hidden'}`}
            >
              {item.answer}
            </div>
          </div>
        ))}
        <div className=" text-bkg hover:globalRounded text-18px w-360px py-16.5px px-24px bg-primary hover:bg-secondary hover:text-text  m-auto   flex   cursor-pointer items-center	 justify-center uppercase transition-all duration-500 active:cursor-grabbing">
          <span className="animate-ping"> * </span>
          Şimdi kayıt ol
          <span className="animate-ping"> * </span>
        </div>
      </div>
    </div>
  )
}
