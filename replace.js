const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('import Link from "next/link"') || content.includes("import Link from 'next/link'")) {
    content = content.replace(/import Link from "next\/link";?/g, 'import { Link } from "@/i18n/routing";');
    content = content.replace(/import Link from 'next\/link';?/g, 'import { Link } from "@/i18n/routing";');
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Replaced in ${count} files.`);
