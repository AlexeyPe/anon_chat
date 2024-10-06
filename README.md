# Анонимный чат на SvelteKit

[Demo](https://anon-chat-six.vercel.app/)

Стек фронтенда: Svelte/SvelteKit, TailwindCSS, Supabase, shadcn, ts/typescript, js/javascript, REST API, Websocket API, HTML, CSS.

Стек бэкенда: Supabase, PosgreSQL, SQL, plpgsql, database functions. 

https://github.com/user-attachments/assets/448ce567-3389-4706-a354-9c2fcc3add45

*Время utc+0.

# Высшие показатели сайта - lighthouse 
![3jrZxFZhU4](https://github.com/user-attachments/assets/cfed0dea-1a75-4971-a058-6eb3d72991c6)

# Supabase sql код
### Функция `getUserName(userId)`, возвращает имя пользователя.
```sql
CREATE
OR REPLACE FUNCTION getUserName (userId BIGINT) RETURNS TEXT AS $$
DECLARE
    userName text;
    randomColor text;
    randomAnimal text;
BEGIN
    -- Попытка получить имя пользователя
    SELECT "userName" INTO userName FROM public.users WHERE "userId" = userId;

    -- Если пользователь найден, вернуть его имя
    IF userName IS NOT NULL THEN
        RETURN userName;
    END IF;

    -- Генерация случайного цвета и животного для нового пользователя
    randomColor := (ARRAY['красная', 'синяя', 'зелёная', 'белая', 'чёрная', 'оранжевая', 'золотая', 'голубая', 'жёлтая'])[FLOOR(RANDOM() * 9) + 1];
    randomAnimal := (ARRAY['черепаха', 'обезьяна', 'собака', 'акула', 'рыба', 'панда', 'лама', 'змея', 'мышь'])[FLOOR(RANDOM() * 9) + 1];

    -- Вставка нового пользователя в таблицу
    INSERT INTO public.users ("userId", "userName") VALUES (userId, randomColor || ' ' || randomAnimal);

    -- Вернуть имя нового пользователя
    RETURN randomColor || ' ' || randomAnimal;
END;
$$ LANGUAGE plpgsql;
```
### Функция `add_message(userId, message)` добавлявет сообщение.
```sql
CREATE
OR REPLACE FUNCTION add_message (userId BIGINT, message TEXT) RETURNS void AS $$
BEGIN
    INSERT INTO public.messages ("user", message) 
    VALUES (userId, message);
END;
$$ LANGUAGE plpgsql;
```
### Функция `delete_all_messages()` удаляет все сообщения.
```sql
CREATE
OR REPLACE FUNCTION delete_all_messages () RETURNS void AS $$
BEGIN
    DELETE FROM public.messages
    WHERE id IS NOT NULL;  -- Условие, которое всегда истинно
END;
$$ LANGUAGE plpgsql;
```
