import styled from 'styled-components'

export const NavigateButtons = styled.button`
  color: ${value => (value.isActive ? '#483D8B' : '#ffffff')};
  border: 2px solid ${value => (value.isActive ? '#483D8B' : '#ffffff')};
  background-color: ${value => (value.isActive ? 'inherit' : '#483D8B')};
`

export const PrevNavigateButton = styled.button`
  color: ${value => (value.isDisabled ? '#fff' : 'gray')};
  background-color: ${value => (value.isDisabled ? '#8A2BE2' : 'inherit')};
  border: 2px solid ${value => (value.isDisabled ? '#8A2BE2' : 'gray')};
  padding: 12px;
  border-radius: 10px;
  font-family: 'Roboto';
  font-weight: 600;
  margin-right:20px;
  height: 50px;
  width: 50px;
`

export const ForwardNavigateButton = styled.button`
  color: ${value => (value.isDisabled ? '#fff' : 'gray')};
  border: 2px solid ${value => (value.isDisabled ? '#8A2BE2' : 'gray')};
  background-color: ${value => (value.isDisabled ? '#8A2BE2' : 'inherit')};
  width: 50px;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px;
  font-family: 'Roboto';
  height: 50px;
`

