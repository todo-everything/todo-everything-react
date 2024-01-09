import type { Meta, StoryObj } from '@storybook/react'

import Header from './Header'
import { IUser } from '~/api/models'

const meta = {
  title: 'TDE/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    // layout: 'centered'
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    user: {
      id: 1,
      email: 'wat@example.com',
    } as IUser,
  },
}

export const LoggedOut: Story = {}
