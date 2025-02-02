import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../test-data/credentials.json');

// Описываем тип данных для объекта учетных данных
interface Credentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  organization: string;
}

// Функция для сохранения email и пароля в JSON файл
export function saveCredentialsToFile(email: string, password: string, firstName: string, lastName: string, phone: string, organization: string) {
  const data: Credentials = { email, password, firstName, lastName, phone, organization };

  // Описываем тип массива данных как массив объектов Credentials
  let fileData: Credentials[] = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.trim()) { // Проверяем, что файл не пуст
      try {
        fileData = JSON.parse(fileContent) as Credentials[];
      } catch (err) {
        console.error('Ошибка при чтении JSON:', err);
      }
    }
  }

  fileData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');
}

// Функция для чтения данных из JSON файла
export function readCredentialsFromFile(): Credentials[] {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.trim()) { // Проверяем, что файл не пуст
      try {
        return JSON.parse(fileContent) as Credentials[];
      } catch (err) {
        console.error('Ошибка при чтении JSON:', err);
        return [];
      }
    }
  }
  return [];
}
