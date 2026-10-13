import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleSidebar = (): void => {
    setIsOpen((i) => !i);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
            title="Шрифт"
          />

          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
            title="Размер шрифта"
          />

          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
            title="Цвет шрифта"
          />

          <Separator />

          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
            title="Цвет фона"
          />

          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
            title="Ширина контента"
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
