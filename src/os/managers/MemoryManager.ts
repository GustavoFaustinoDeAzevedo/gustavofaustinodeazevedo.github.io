class MemoryManager {
  constructor(public total: number) {}
  private used = 0;
  private allocations = new Map<number, number>();

  getUsed() {
    return this.used;
  }

  getAllocations() {
    return this.allocations;
  }

  getFree() {
    return this.total - this.used;
  }

  getPercentUsed() {
    return (this.used / this.total) * 100;
  }

  getPercentFree() {
    return (this.total - this.used) / this.total;
  }

  allocate(pid: number, size: number): boolean {
    if (this.used + size > this.total) return false;

    this.used += size;
    this.allocations.set(pid, size);
    return true;
  }

  free(pid: number) {
    const size = this.allocations.get(pid) ?? 0;
    if (size) {
      this.used -= size;
      this.allocations.delete(pid);
    }
  }

  getMemoryStats() {
    return {
      total: this.total,
      used: this.used,
      free: this.getFree(),
      percentUsed: this.getPercentUsed(),
      percentFree: this.getPercentFree(),
      allocations: this.allocations,
    };
  }
}

export default MemoryManager;
