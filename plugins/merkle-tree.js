import { keccak256 } from 'js-sha3'

const zeroAddress = '0x0000000000000000000000000000000000000000';
export default {
    zeroAddress,
    leaves: [],
    levels: 0,
    tree: [],
    currentLevel: 0,
    init() {
        this.tree = [];
        this.leaves = [];
        this.levels = 0;
        this.currentLevel = 0;
    },
    setLeaves(leaves) {
        this.leaves = [...leaves];
    },
    growTree() {
        if (this.leaves.length === 0) {
            return false;
        }

        // 樹高
        this.levels = Math.ceil(Math.log2(this.leaves.length)) + 1;

        // 葉子節點補滿後數量
        const leafAmount = Math.pow(2, this.levels - 1);

        const fillLeaves = Array(leafAmount - this.leaves.length).fill(this.zeroAddress);
        this.tree = Array.from(Array(this.levels), () => []);
        this.currentLevel = this.levels - 1;
        this.leaves.push(...fillLeaves);

        return this.hash(this.leaves);
    },
    hash(group) {
        if (group.length > 1) {
            const subAmount = group.length / 2
            
            const hashResult = keccak256(
                this.hash(group.slice(0, subAmount)) +
                this.hash(group.slice(subAmount, group.length))
            );
            this.currentLevel--;
            this.tree[this.currentLevel].push(hashResult);
            // console.log('push node', this.tree)
            // console.log('node:', this.currentLevel, hashResult)
            return hashResult;
        }

        const hashLeaf = keccak256(group[0]);

        this.currentLevel = this.levels - 1;
        this.tree[this.currentLevel].push(hashLeaf);
        // console.log('push leaf', this.tree)
        // console.log('leave:', this.currentLevel, hashLeaf)
        return hashLeaf;
    }
}
