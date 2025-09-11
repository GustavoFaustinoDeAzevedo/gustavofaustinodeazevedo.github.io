import { FileEntry } from '.';

class FileSystem {
  private files = new Map<string, FileEntry>();
  private totalSpace: number;
  private usedSpace = 0;

  constructor(totalSpace: number) {
    this.totalSpace = totalSpace;
  }

  createFile(pid: number, name: string, content: string): boolean {
    const size = content.length;
    if (this.usedSpace + size > this.totalSpace) {
      console.log(`❌ Espaço insuficiente para criar ${name}`);
      return false;
    }
    const now = new Date();
    this.files.set(name, {
      name,
      ownerUid: pid,
      content,
      size,
      createdAt: now,
      updatedAt: now,
      group: 'root',
      permissions: { owner: 'rw', group: 'r', others: 'r' },
    });
    this.usedSpace += size;
    console.log(`📄 Processo ${pid} criou arquivo ${name} (${size} bytes)`);
    return true;
  }

  readFile(pid: number, name: string): string | null {
    const file = this.files.get(name);

    if (!file || file.ownerUid !== pid) {
      console.log(`⚠️ Processo ${pid} tentou ler ${name} sem permissão`);
      return null;
    }
    return file.content;
  }

  writeFile(pid: number, name: string, content: string): boolean {
    const file = this.files.get(name);
    if (!file || file.ownerUid !== pid) {
      console.log(
        `⚠️ Processo ${pid} tentou escrever em ${name} sem permissão`
      );
      return false;
    }
    const newSize = content.length;
    const diff = newSize - file.size;
    if (this.usedSpace + diff > this.totalSpace) {
      console.log(`❌ Espaço insuficiente para atualizar ${name}`);
      return false;
    }
    file.content = content;
    file.size = newSize;
    file.updatedAt = new Date();
    this.usedSpace += diff;
    return true;
  }

  deleteFile(pid: number, name: string): boolean {
    const file = this.files.get(name);
    if (!file || file.ownerUid !== pid) {
      console.log(`⚠️ Processo ${pid} tentou deletar ${name} sem permissão`);
      return false;
    }
    this.usedSpace -= file.size;
    this.files.delete(name);
    console.log(`🗑️ Processo ${pid} deletou arquivo ${name}`);
    return true;
  }

  listFiles(pid?: number): FileEntry[] {
    if (pid === undefined) return Array.from(this.files.values());
    return Array.from(this.files.values()).filter((f) => f.ownerUid === pid);
  }

  getStats() {
    return {
      total: this.totalSpace,
      used: this.usedSpace,
      free: this.totalSpace - this.usedSpace,
      percentUsed: (this.usedSpace / this.totalSpace) * 100,
    };
  }
}

export default FileSystem;
