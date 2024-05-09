import React from 'react';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import Translator from './Translator';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const selectLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const selectedLanguage = i18n.language;

  return (
    <>
      <Menu placement="top">
        <MenuHandler>
          <IconButton variant="text">
            <span className="material-symbols-outlined">globe</span>
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem
            onClick={() => {
              selectLanguage('pt-BR');
            }}
          >
            <p>
              <Translator path="language.pt-BR" />
            </p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              selectLanguage('en-US');
            }}
          >
            <p>
              {' '}
              <Translator path="language.en-US" />
            </p>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default LanguageSelector;
