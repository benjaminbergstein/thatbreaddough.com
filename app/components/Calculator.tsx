import React, { FC, useRef, useState, useLayoutEffect, useEffect } from 'react'
import styled from 'styled-components'

import { Recipe } from '../utils/calculator/types'
import { Recipes } from '../utils/calculator/data'
import { recipeFromInput } from '../utils/calculator/recipeFromInput'
import useStorage from '../hooks/useStorage'
import Link from 'next/link'

import {
  Grid,
  Text,
  Heading,
  Box,
  Main,
  Input,
  Button,
} from './System'

const DefaultRecipe = Recipes.sourdoughLoaf

const Row = styled(Box)``
Row.defaultProps = {
  display: "flex",
  justifyContent: "space-between",
  py: 3,
  px: 3,
}

const Calculator: FC<unknown> = () => {
  const [storage, setTimer, setRecipe] = useStorage()
  const isRecipePersisted = !!storage.recipe
  const recipe = storage?.recipe || recipeFromInput(DefaultRecipe)
  const totalDoughWeightRef = useRef<HTMLInputElement>(null)
  const hydrationPercentRef = useRef<HTMLInputElement>(null)
  const starterPercentRef = useRef<HTMLInputElement>(null)
  const saltPercentRef = useRef<HTMLInputElement>(null)
  const scaleRef = useRef<HTMLInputElement>(null)
  const recipeInput = storage.recipeInput || DefaultRecipe

  const flour = recipe.flour
  const water = recipe.water
  const starter = recipe.starter
  const salt = recipe.salt
  const totalDoughWeight = recipe.totalDoughWeight

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalDoughWeight = parseInt(totalDoughWeightRef?.current?.value)
    const hydrationPercent = parseInt(hydrationPercentRef?.current?.value)
    const starterPercent = parseInt(starterPercentRef?.current?.value)
    const saltPercent = parseInt(saltPercentRef?.current?.value)
    const scale = parseInt(scaleRef?.current?.value)

    setRecipe(recipeFromInput({
      totalDoughWeight,
      hydrationPercent,
      starterPercent,
      saltPercent,
      scale,
    }), {
      totalDoughWeight,
      hydrationPercent,
      starterPercent,
      saltPercent,
      scale,
    })
  }

  return <>
    <form onSubmit={handleSubmit}>
      <Row>
        Total dough weight
        <Box>
          <Input defaultValue={recipeInput.totalDoughWeight} ref={totalDoughWeightRef} /> g
        </Box>
      </Row>
      <Row>
        Hydration percent
        <Box>
          <Input min={0} max={100} type="number" defaultValue={recipeInput.hydrationPercent} ref={hydrationPercentRef} /> %
        </Box>
      </Row>
      <Row>
        Starter percent
        <Box>
          <Input min={0} max={100} type="number" defaultValue={recipeInput.starterPercent} ref={starterPercentRef} /> %
        </Box>
      </Row>
      <Row>
        Salt percent
        <Box>
          <Input min={0} max={1000} type="number" defaultValue={recipeInput.saltPercent} ref={saltPercentRef} /> %
        </Box>
      </Row>
      <Row>
        Scale
        <Box>
          <Input min={0} max={1000} type="number" defaultValue={recipeInput.scale} ref={scaleRef} /> %
        </Box>
      </Row>
      <Box px={3} display="flex" justifyItems="center" borderWidth="2px" borderLeftWidth="0px" borderRightWidth="0px" borderColor="#ccc" borderStyle="solid" py={5} my={5}>
        <Button width="100%" type="submit">Calculate</Button>
      </Box>
      <Row>
        Flour
        <Box>{recipe.flour}g</Box>
      </Row>
      <Row>
        Water
        <Box>{recipe.water}g</Box>
      </Row>
      <Row>
        Starter
        <Box>{recipe.starter}g</Box>
      </Row>
      <Row>
        Salt
        <Box>{recipe.salt}g</Box>
      </Row>
      <Row>
        Total dough weight
        <Box>{recipe.totalDoughWeight}g</Box>
      </Row>
      {isRecipePersisted && <Box px={3} display="flex" justifyItems="center" borderWidth="2px" borderLeftWidth="0px" borderRightWidth="0px" borderColor="#ccc" borderStyle="solid" py={5} my={5}>
        <Link href="/sourdough-timer?ref=timer_cta">
          <Button width="100%">
            Go to timer
          </Button>
        </Link>
      </Box>}
    </form>
  </>
}

export default Calculator
