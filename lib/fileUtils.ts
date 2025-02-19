import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.promises.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function getMdFileContent(fileName: string, fileDirName: string): Promise<string> {
    const filePath = path.join(process.cwd(), fileDirName, fileName);
    if (!await fileExists(filePath)) {
        throw new Error('This is not a valid Markdown file. Please check file extension!');
    }

    try {
        return await fs.promises.readFile(filePath, 'utf-8');
    } catch (error) {
        const err = error as Error;
        console.error('Error reading file:', err);
        throw new Error(`Failed to read file "${fileName}": ${err.message}`);
    }
}

function getFrontMatter(fileContent: string): FrontMatterInterface {
    const { data } = matter(fileContent);
    return {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        thumbnail: data.thumbnail || '',
    };
}

function getMdContent(fileContent: string): string {
    return matter(fileContent).content;
}

async function getMdFilesInDir(fileDirName: string): Promise<string[]> {
    const directoryPath = path.join(process.cwd(), fileDirName);
    if (!await fileExists(directoryPath)) {
        throw new Error(`Directory "${fileDirName}" does not exist.`);
    }

    const dirData = await fs.promises.readdir(directoryPath);
    return dirData.filter((val) => val.endsWith('.md'));
}

export async function serializeMdFileContent(fileName: string, fileDirName: string): Promise<BlogPost> {
    fileName = decodeURI(fileName);
    if (!fileName.endsWith('.md')) {
        fileName += '.md';
    }

    const fileContent = await getMdFileContent(fileName, fileDirName);
    if (!fileContent) {
        throw new Error('Markdown file is empty. Failed to serialize.');
    }

    const frontMatter = getFrontMatter(fileContent);
    const mdContent = getMdContent(fileContent);
    const slug = fileName.replace(/\.md$/, '');

    return { slug, frontMatter, mdContent };
}

export async function getAllSerializedMdFilesInDir(fileDirName: string): Promise<BlogPost[]> {
    const directoryPath = path.join(process.cwd(), fileDirName);
    if (!await fileExists(directoryPath)) {
        throw new Error(`Directory "${fileDirName}" does not exist.`);
    }

    const files = await getMdFilesInDir(fileDirName);
    return Promise.all(files.map((file) => serializeMdFileContent(file, fileDirName)));
}

export async function getAllImagesNameInDir(fileDirName: string): Promise<string[]>{
    const imageDirPath = path.join(process.cwd(),`public/${fileDirName}`)
    if (await !fs.promises.access(imageDirPath)){
        throw new Error('This Gallery Directory does not exist')
    }
    const images: string[] =  (await fs.promises.readdir(imageDirPath,'utf-8')).filter((items) => 
        items.endsWith('JPG') || 
        items.endsWith('jpeg') || 
        items.endsWith('png') || 
        items.endsWith('webm') || 
        items.endsWith('jpg')
    )
    return images
}