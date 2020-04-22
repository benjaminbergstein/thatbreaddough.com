import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { IconType } from 'react-icons'

import {
  Anchor,
} from 'grommet'

interface Props {
  href: string
  iconOnly?: boolean
  label: string
  Icon: IconType
}

const NavLink: React.FC<Props> = ({
  href,
  iconOnly = false,
  label,
  Icon,
}) => (
  <>
    <Link href={`${href}?ref=global_nav`}>
      <Anchor
        label={
          <>
            <Icon />
            <NavLabel>{!iconOnly && ` ${label}`}</NavLabel>
          </>
        }
        a11yTitle={label}
      />
    </Link>
  </>
)

const NavLabel = styled.span`
  position: relative;
  top: -1px;
  marginLeft: 3px;
`

export default NavLink
