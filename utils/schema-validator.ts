import fs from 'fs/promises'
import path from 'path'
import Ajv from "ajv"
import { createSchema } from 'genson-js';
import addFormats from "ajv-formats"

const SCHEMA_BASE_PATH = './response-schemas'
const ajvInstance = new Ajv({allErrors: true})
addFormats(ajvInstance)

export async function validateSchema(dirName:string, fileName: string, responseBody: object, createSchemaFlag: boolean = false){
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`)
    if(createSchemaFlag) await generateNewSchema(responseBody, schemaPath)
    const schema = await loadSchema(schemaPath)
    const validate = ajvInstance.compile(schema)
  const valid = validate(responseBody)

  if (!valid) {
    throw new Error(
            `Schema validation ${fileName}_schema.json failed:\n` +
            `${JSON.stringify(validate.errors, null, 4)}\n\n` +
            `Actual response body: \n` +
            `${JSON.stringify(responseBody, null, 4)}`
    )
  }
}

async function loadSchema(schemaPath: string) {
    try {
        // const schemaContent = await fs.readFile(SCHEMA_BASE_PATH, 'utf-8')
        const schemaContent = await fs.readFile(schemaPath, 'utf-8')
        return JSON.parse(schemaContent)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to read the schema file: ${error.message}`)
        }
        throw new Error('Failed to read the schema file')
    }
}

async function generateNewSchema(responseBody: object, schemaPath: string) {
    try{
            const generatedSchema = addDateTimeFormat(createSchema(responseBody))
            await fs.mkdir(path.dirname(schemaPath), {recursive: true})
            await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 4))
        } catch (error) {
            throw new Error(`Failed to create schema file: ${error.message}`)
        }
}

function addDateTimeFormat(schema: any): any {
    const DATE_TIME_FIELDS = ['createdAt', 'updatedAt', 'deletedAt']
    
    if (schema.type === 'object' && schema.properties) {
        for (const key of Object.keys(schema.properties)) {
            if (DATE_TIME_FIELDS.includes(key)) {
                schema.properties[key].format = 'date-time'
            } else {
                addDateTimeFormat(schema.properties[key])
            }
        }
    }
    
    if (schema.type === 'array' && schema.items) {
        addDateTimeFormat(schema.items)
    }
    
    return schema
}