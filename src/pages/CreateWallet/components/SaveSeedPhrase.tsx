/* eslint-disable no-console */
import React from 'react'
import { SmallRoundButton } from '../../../components/commonStyledComponents/Buttons'
import { ContainerWithDispersedContent, TextContainer } from '../../../components/commonStyledComponents/Containers'
import { LgTitle } from '../../../components/commonStyledComponents/Text'
import { COLORS, FONT_SIZES } from '../../../components/variables'


const SaveSeedPhrase = ({
  mnemonicAndSeed, savedSeedWords, setSavedSeedWords, randomlyPlacedSeedWords, updateRandomlyPlacedSeedWords,
}:{ mnemonicAndSeed, savedSeedWords, setSavedSeedWords, randomlyPlacedSeedWords, updateRandomlyPlacedSeedWords, }) => {
  console.log('mnemonic', mnemonicAndSeed)

  const amountOfNotSavedWords = mnemonicAndSeed.mnemonic.split(' ').length - savedSeedWords.length
  const amountOfNotSavedWordsAsArray = Array.from({ length: amountOfNotSavedWords }, (_, i) => i + savedSeedWords.length)

  const emptyCells = amountOfNotSavedWordsAsArray.map(() => '')

  const savedSeedWordsAndEmptyCells = savedSeedWords.concat(emptyCells)

  return (
    <ContainerWithDispersedContent>
      <LgTitle>
        Put the words of your Seed Phrase in the right order
      </LgTitle>
      <TextContainer needBorder needOpacity>
        {savedSeedWordsAndEmptyCells.map((word, index) => (
          <SmallRoundButton
            disabled={word === ''}
            fontSize={word.length >= 6 ? FONT_SIZES.md : FONT_SIZES.rg}
            background={word === '' ? '' : COLORS.primary}
            needOpacity={word === ''}
            onClick={() => {
              const newSavedSeedWords = [...savedSeedWords.slice(0, index), '', ...savedSeedWords.slice(index + 1)]

              const newRandomlySavedWords = [
                ...randomlyPlacedSeedWords,
                word,
              ]

              setSavedSeedWords(newSavedSeedWords)
              updateRandomlyPlacedSeedWords(newRandomlySavedWords)
            }}
          >
            {word === '' ? index + 1 : word}
          </SmallRoundButton>
        ))}
      </TextContainer>
      <TextContainer>
        {randomlyPlacedSeedWords.map((word, index) => (
          <SmallRoundButton
            fontSize={word.length >= 6 ? FONT_SIZES.md : FONT_SIZES.rg}
                // eslint-disable-next-line react/no-array-index-key
            key={`${word}-selected-${index}`}
            onClick={() => {
              const newRandomlySavedWords = randomlyPlacedSeedWords.filter(
                (w, i) => !(
                  w === word
                        && randomlyPlacedSeedWords.indexOf(word) === i
                ),
              )
              const emptyCellIndex = savedSeedWords.findIndex((el) => el === '')
              if (emptyCellIndex === -1) {
                const newSavedSeedWords = [...savedSeedWords, word]
                setSavedSeedWords(newSavedSeedWords)
              } else {
                const updatedSavedWords = [...savedSeedWords.slice(0, emptyCellIndex), word, ...savedSeedWords.slice(emptyCellIndex + 1)]
                setSavedSeedWords(updatedSavedWords)
              }

              updateRandomlyPlacedSeedWords(newRandomlySavedWords)
            }}
          >
            {word}
          </SmallRoundButton>
        ))}
      </TextContainer>
    </ContainerWithDispersedContent>
  )
}

export { SaveSeedPhrase }
