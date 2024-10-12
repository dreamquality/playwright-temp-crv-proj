import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения

const mailsacApiKey = process.env.MAILSAC_API_KEY;
const mailsacEmailDomain = '@mailsac.com';

// Функция для получения письма с верификационной ссылкой
async function getVerificationLink(email: string): Promise<string> {
    const emailCheckUrl = `https://mailsac.com/api/addresses/${email}/messages`;

    for (let i = 0; i < 10; i++) {
        try {
            const response = await axios.get(emailCheckUrl, {
                headers: { 'Mailsac-Key': mailsacApiKey },
            });
            const messages = response.data;

            console.log(`Attempt ${i + 1}: Fetched messages count: ${messages.length}`);

            if (messages.length > 0) {
                const verificationEmail = messages.find((msg: any) => msg.subject.includes('Confirm your CV Reformatter account'));
                
                if (verificationEmail) {
                    console.log(`Verification email found: ${verificationEmail.subject}`);

                    const emailDetails = await axios.get(
                        `https://mailsac.com/api/addresses/${email}/messages/${verificationEmail._id}`,
                        { headers: { 'Mailsac-Key': mailsacApiKey } }
                    );

                    // Теперь используем поле links из ответа
                    const verificationLinks = emailDetails.data.links;
                    if (verificationLinks && verificationLinks.length > 0) {
                        console.log('Verification link found:', verificationLinks[0]);
                        return verificationLinks[0]; // Возвращаем найденную ссылку
                    } else {
                        console.log('No verification links found in the email body');
                    }
                } else {
                    console.log('No verification email found in messages');
                }
            } else {
                console.log('No messages found');
            }
        } catch (error) {
            console.error(`Error fetching messages: ${error.message}`);
        }

        // Ждем 5 секунд перед следующим запросом
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    throw new Error('Verification link not found after 10 attempts');
}

// Функция для верификации аккаунта через axios
export async function getVerifyAccountLink(email: string): Promise<string> {
    const verificationLink = await getVerificationLink(email);
    return verificationLink;
}

// Генерация временного email на основе времени
export function generateTempEmail(): string {
    const timestamp = new Date().getTime();
    return `testUserCVReformater${timestamp}${mailsacEmailDomain}`;
}
