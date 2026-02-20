
#!/bin/bash

echo "DISK SPACE CLEANUP"
echo "Current space:"
df -h /

echo ""
echo "Starting cleanup..."

# 1. NPM cache
echo "Clearing npm cache..."
npm cache clean --force

# 2. Remove node_modules
echo "Removing node_modules..."
rm -rf /home/ubuntu/app2/node_modules


# 3. Clear build artifacts
echo "Clearing build artifacts..."
rm -rf /home/ubuntu/app2/dist


# 4. System cleanup
echo "System cleanup..."
sudo apt clean
sudo journalctl --vacuum-size=20M
sudo apt autoremove --purge -y

# 5. Check for large files
echo "Large files:"
sudo find /home -type f -size +50M 2>/dev/null | xargs -I {} ls -lh {} | head -10

echo ""
echo "Cleanup complete. New space:"
df -h /